import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as radius from 'radius';
import * as dotenv from 'dotenv';
import { createSocket } from 'node:dgram';
import { iPacket } from './dto/mikrotik.dto';
import * as crypto from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connection } from 'src/connections/entities/connection.entity';

dotenv.config();

@Injectable()
export class RadiusService implements OnModuleInit {
  private readonly logger = new Logger(RadiusService.name);
  
  constructor(
    @InjectRepository(Connection) private connectionRepository: Repository<Connection>,
  ) {}

  private secret = String(process.env.MIKROTIK_RADIUS_PASS);
  private port = Number(process.env.MIKROTIK_RADIUS_PORT);
  private server = createSocket('udp4');
  private packet: iPacket
  private rinfo
  private nasPort
  private nasIp

  onModuleInit() {
    radius.add_dictionary('public/dictionary.mikrotik');
    this.onStart();
  }

  getAtributes(object: any, key: number) {
    return object.filter(el=> el.key === 1)[0].data || null
  }

  bufferToString(buffer: Buffer) {
    return Buffer.from(buffer).toString()
  }

  chapMatch(cPassword: string, chapPassword: any, challenge: any) {
    let hash = chapPassword.slice(1);
    let md5 = crypto.createHash('md5');
    md5.write(chapPassword.slice(0, 1));
    md5.write(Buffer.from(cPassword));
    md5.write(challenge);
    let calc = md5.digest('hex');
    return hash.equals(Buffer.from(calc, 'hex'));
  }

  async onStart() {

    this.server.on('message', async (msg, rinfo) => {
      
      this.rinfo = rinfo

      try {
        this.packet = radius.decode({ packet: msg, secret: this.secret });
        if (this.packet.code === 'Access-Accept') console.log('connected');
      } catch (e) {
        console.log('Failed to decode radius packet, silently dropping:', e);
        return new Error('ERROR_RADIUS_DECODE');
      }

      try {
        if (this.packet.code === 'Access-Request') {
          const username = this.packet.attributes['User-Name'];
          const connection = await this.connectionRepository.findOne({
            where: {
              username
            },
            relations: ['client','box','plan']
          });

          const atrChapChallenge = this.packet?.attributes['CHAP-Challenge']
          const atrChapPassword = this.packet?.attributes['CHAP-Password']

          const validPassword = this.chapMatch(connection?.password, atrChapPassword, atrChapChallenge)

          let response
          
          if (username == connection?.username && !!validPassword) {

            const velocid = `${connection?.plan?.upload}/${connection?.plan?.download}`;

            // https://wiki.mikrotik.com/wiki/Manual:RADIUS_Client/vendor_dictionary
            //https://wiki.mikrotik.com/wiki/Manual:RADIUS_Client
            let mikrotik = []

            // --- TEMP
            this.nasPort = this.packet.attributes['NAS-Port']
            this.nasIp = this.packet.attributes['NAS-IP-Address']
            console.log(this.packet.attributes)

            mikrotik.push(['Mikrotik-Rate-Limit', velocid])// bust "10M/5M 15M/7M"
            
            //Corte
            mikrotik.push(['Mikrotik-Delegated-IPv6-Pool',connection?.status === 2 ? 'wanpool' : 'wanpgcorte'])

            // 'Framed-IPv6-Pool'
            let attributes = [
              ['User-Name', this.packet.attributes['User-Name']],
              ['NAS-Port', this.packet.attributes['NAS-Port']],
              // ['Delegated-IPv6-Prefix-Pool','wanpgcorte'],
              ['Vendor-Specific','Mikrotik', mikrotik],
            ]            
            
            //Remote Address IPV4
            if (!!connection?.ipV4Address)
              attributes.push(['Framed-IP-Address', connection?.ipV4Address])

            //Remote Address IPV6
            if (!!connection?.ipV6Address)
              attributes.push(['Framed-IPv6-Prefix', connection?.ipV6Address])
          
            //Corte
            if (connection?.status !== 2)
              attributes
                .push(['Framed-Pool', 'pgcorte'])

            response = radius.encode_response({
              packet: this.packet,
              code: 'Access-Accept',
              secret: this.secret,
              attributes,
            });

            this.logger.debug(`radius server accept user ${username}`);
            
            setTimeout(() => {
              this.disconnectClient(connection?.id)
            }, 10000);
          }
          else {
            this.logger.debug(`radius server reject user ${username}`);
            response = radius.encode_response({
              packet: this.secret,
              code: 'Access-Reject',
            });            
          }

          this.server.send(
            response,
            0,
            response.length || 0,
            rinfo.port,
            rinfo.address,
            (err, bytes) => {
              if (err) console.log('Error sending response to ', rinfo);
            },
          );
        }
      } catch (error) {
        console.log('[decoder error]', error);
        return new Error('ERROR_RADIUS_DECODE');
      }
    }); // -- 'message'

    this.server.on('listening', () => {
      const address = this.server.address();
      this.logger.debug(`radius server listening ${address.address}:${address.port}`);
    }); // -- listening

    this.server.bind(this.port);
  }

  async disconnectClient(id: string) {
    console.log('disconnectClient')

    const connect = await this.connectionRepository.findOne({
      where: { id },
      relations: ['box','box.olt','box.olt.bras']
    })

    const packet = {
      code: 'Disconnect-Request',
      secret: this.secret,
      // identifier: Math.floor(Math.random() * 256),
      attributes: [
        ['User-Name', connect?.username],
        // ['Framed-IP-Address', '172.16.25.255'],
        ['NAS-IP-Address', connect?.box?.olt?.bras?.ipv4manager],
        ['NAS-Port-Type', 'Virtual'],
        ['NAS-Identifier', 'Mikrotik'],
        ['Service-Type', 'Framed-User']
      ],
    };
  
    const encodedPacket = radius.encode(packet, this.secret);
    this.server.send(encodedPacket, 0, encodedPacket.length, 1812, this.server.address().address, (err, response) => {
      if (err) {
        console.log(`Erro ao desconectar usuário ${connect?.username}: ${err}`);
      } else {
        const decodedResponse = radius.decode({ packet: response, secret: this.secret });
        if (decodedResponse.code !== 'Disconnect-ACK') {
          console.log(`Erro ao desconectar usuário ${connect?.username}`);
        } else {
          console.log(`Usuário ${connect?.username} desconectado com sucesso`);
        }
      }
    });

    // const response = radius.encode_response({
    //   packet: this.packet,
    //   code: 'Disconnect-Request',
    //   secret: this.secret,
    //   identifier: Math.floor(Math.random() * 256),
    //   attributes: [
    //     ['User-Name', connect?.username],
    //     // ['Framed-IP-Addres', '192.168.111.109'],
    //     ['NAS-Identifier', 'MikroTik'],
    //     ['NAS-IP-Address', connect?.box?.olt?.bras?.ipv4manager],

    //     ['NAS-Port-Type', 'Ethernet'],
    //     ['NAS-Port',this.nasPort],
    //     // ['Service-Type', 'Framed-User'],
        
    //     ['Calling-Station-Id', '40:3F:8C:E2:27:AD'],
    //     ['Called-Station-Id', '2-pppoe'],
    //     ['NAS-Port-Id', '2-client'],
    //   ]
    // })
    

    // this.server.send(
    //   response,
    //   0,
    //   response.length || 0,
    //   this.rinfo.port,
    //   this.rinfo.address,
    //   (err, response) => {
    //     if (err) console.log('Error sending response to ', err);
    //     else console.log({response})
    //     this.logger.debug(`radius server disconnect user ${connect?.username}`);
    //   },
    // );

  }
}

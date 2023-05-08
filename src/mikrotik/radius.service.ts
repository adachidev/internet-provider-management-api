import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
// import * as radius from './lib/radius';
import * as radius from 'radius';
import * as dotenv from 'dotenv';
import { RemoteInfo, createSocket } from 'node:dgram';
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

  accessAccept(username: string, attributes: any, status: number) {
    
    const text = status !== 2 ? 'C' : 'N'
    this.logger.debug(`radius server accept user ${username} ${text}`);

    return radius.encode_response({
      packet: this.packet,
      code: 'Access-Accept',
      secret: this.secret,
      attributes,
    });    
  }

  accessReject(username: string) {
    this.logger.debug(`radius server reject user ${username}`);

    return radius.encode_response({
      packet: this.secret,
      code: 'Access-Reject',
    });
  }

  async getClient(username: string) {
    return await this.connectionRepository.findOne({
      where: {
        username
      },
      relations: ['client','box','plan']
    });
  }

  async AccessRequest(rinfo: RemoteInfo) {
    try {
      const username = this.packet.attributes['User-Name'];
      const connection = await this.getClient(username)

      const atrChapChallenge = this.packet?.attributes['CHAP-Challenge']
      const atrChapPassword = this.packet?.attributes['CHAP-Password']
      const validPassword = this.chapMatch(connection?.password, atrChapPassword, atrChapChallenge)

      let response
      
      if (username == connection?.username && !!validPassword) {

        const speedConnection = `${connection?.plan?.upload}/${connection?.plan?.download}`;

        // https://wiki.mikrotik.com/wiki/Manual:RADIUS_Client/vendor_dictionary
        //https://wiki.mikrotik.com/wiki/Manual:RADIUS_Client
        let mikrotik = []

        // --- TEMP
        const nasPort = this.packet.attributes['NAS-Port']
        const nasIp = this.packet.attributes['NAS-IP-Address']
        // console.log(this.packet.attributes)

        mikrotik.push(['Mikrotik-Rate-Limit', speedConnection])// bust "10M/5M 15M/7M"
        
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
          attributes.push(['Framed-Pool', 'pgcorte'])

        // Access-Accept
        response = this.accessAccept(username, attributes, connection?.status)
      }
      else
        // Access-Reject
        response = this.accessReject(username)         

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

    } catch (error) {
      console.log('[decoder error]', error);
      return new Error('ERROR_RADIUS_DECODE');
    }
  }

  async onStart() {

    // message
    this.server.on('message', async (msg, rinfo) => {
      try {
        this.packet = radius.decode({ packet: msg, secret: this.secret });
        
        if (this.packet.code === 'Access-Accept')
          console.log('connected');
        
        if (this.packet?.code === 'Access-Request')
          this.AccessRequest(rinfo)

      } catch (e) {
        console.log('Failed to decode radius packet, silently dropping:', e);
        return new Error('ERROR_RADIUS_DECODE');
      }
    }); // -- 'message'

    // listening
    this.server.on('listening', () => {
      const connection = this.server.address();
      this.logger.debug(`radius server listening ${connection.address}:${connection.port}`);
    }); // -- listening

    this.server.bind(this.port);
  }

  async disconnectRequest(id: string) {
    console.log('disconnectClient')

    const connect = await this.connectionRepository.findOne({
      where: { id },
      relations: ['box','box.olt','box.olt.bras']
    })
    this.logger.debug(`radius server disconnected user ${connect.username}`);

    const  encoded = radius.encode({
      code: 'Disconnect-Request',
      secret: this.secret,
      identifier: 0,
      attributes: [
        ['User-Name', connect.username],
        ['NAS-Identifier', 'MikroTik'],
      ]
    });

    this.server.send(
      encoded,
      0,
      encoded.length,
      3799, '127.0.0.1', (err, bytes) => {
  
        if (err) {
          console.log('Error sending response to ');
          console.log(err);
        }
        console.log(bytes);
      });
    // const encodedPacket = radius.encode(packet, this.secret);
    // this.server.send(encodedPacket, 0, encodedPacket.length, 1812, this.server.address().address, (err, response) => {
    //   if (err) {
    //     console.log(`Erro ao desconectar usuário ${connect?.username}: ${err}`);
    //   } else {
    //     const decodedResponse = radius.decode({ packet: response, secret: this.secret });
    //     if (decodedResponse.code !== 'Disconnect-ACK') {
    //       console.log(`Erro ao desconectar usuário ${connect?.username}`);
    //     } else {
    //       console.log(`Usuário ${connect?.username} desconectado com sucesso`);
    //     }
    //   }
    // });
  }
}

import { Injectable, OnModuleInit } from '@nestjs/common';
import * as radius from 'radius';
import * as dotenv from 'dotenv';
import { createSocket } from 'node:dgram';
import { ClientsService } from 'src/clients/clients.service';
import { iPacket } from './dto/mikrotik.dto';

dotenv.config();

@Injectable()
export class MikrotikService implements OnModuleInit {
  constructor(private readonly clientsService: ClientsService) {}

  private secret = String(process.env.MIKROTIK_RADIUS_PASS);
  private port = Number(process.env.MIKROTIK_RADIUS_PORT);
  private server = createSocket('udp4');

  onModuleInit() {
    radius.add_dictionary('public/dictionary.mikrotik');
    this.onStart();
  }

  async onStart() {
    this.server.on('message', async (msg, rinfo) => {
      let code: string, username: string, password: string, packet: iPacket;

      try {
        packet = radius.decode({ packet: msg, secret: this.secret });
      } catch (e) {
        console.log('Failed to decode radius packet, silently dropping:', e);
        return new Error('ERROR_RADIUS_DECODE');
      }

      try {
        if (packet.code != 'Access-Request') {
          //console.log('unknown packet type: ', packet.code)
          return;
        }

        username = packet.attributes['User-Name'];
        password = packet.attributes['User-Password'];

        const client = await this.clientsService.findUserName(username);
        console.log({ client });
        // });
        // const client = await ms.get(`/clients/${username}/username`);
        // console.log(client)
        // if (!client.data) return
        const code =
          username == client.username && password == client.password
            ? 'Access-Accept'
            : 'Access-Reject';
        // code = 'Access-Reject';
        // const velocid = '1M';
        const velocid = `${client.plan.upload}M/${client.plan.download}M`;
        const attrs = [
          ['NAS-Port-Type', packet.attributes['NAS-Port-Type']],
          ['Calling-Station-Id', packet.attributes['Calling-Station-Id']],
          ['Called-Station-Id', packet.attributes['Called-Station-Id']],
          ['NAS-Port-Id', packet.attributes['NAS-Port-Id']],
          ['User-Name', packet.attributes['User-Name']],
          ['NAS-Port', packet.attributes['NAS-Port']],
          // ['Acct-Session-Id', packet.attributes['Acct-Session-Id']],
          // ['Framed-IP-Address', packet.attributes['Framed-IP-Address']],
          ['User-Password', packet.attributes['User-Password']],
          ['Service-Type', packet.attributes['Service-Type']],
          ['NAS-Identifier', packet.attributes['NAS-Identifier']],
          ['NAS-IP-Address', packet.attributes['NAS-IP-Address']],
          [
            'Vendor-Specific',
            'Mikrotik',
            [
              ['Mikrotik-Host-IP', packet.attributes['NAS-IP-Address']],
              ['Mikrotik-Rate-Limit', velocid],
            ],
          ],
        ];

        const response = radius.encode({
          code: code,
          secret: this.secret,
          attributes: attrs,
          identifier: packet.identifier,
          // authenticator?: packet?.authenticator
        });

        // const res = await radius.decode({ packet: response, secret: secret });

        // if (res.code === 'Access-Accept') {
        //   const { attributes } = res;
        //   const id = client.data._id;

        //   const _client = {
        //     macAddress: attributes['Calling-Station-Id'],
        //     uptime: Date.now(),
        //     connected: true,
        //   };

        //   // const resUpdate = await ms.put(`/clients/${id}`, _client);
        // }

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
    }); // -- 'message'

    this.server.on('listening', () => {
      const address = this.server.address();
      console.log(`radius server listening ${address.address}:${address.port}`);
    }); // -- listening

    this.server.bind(this.port);
  }
}

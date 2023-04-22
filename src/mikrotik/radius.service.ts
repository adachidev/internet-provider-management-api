// import { Injectable, OnModuleInit } from '@nestjs/common';
// import * as radius from 'radius';
// import * as dotenv from 'dotenv';
// import { createSocket } from 'node:dgram';
// import { ClientsService } from 'src/clients/clients.service';
// import { iPacket } from './dto/mikrotik.dto';
// import * as md5 from 'md5';
// import { CHAP, MSCHAPv1 } from 'chap';
// import * as crypto from 'crypto';
// import { ConnectionsService } from 'src/connections/connections.service';

// dotenv.config();

// @Injectable()
// export class RadiusService implements OnModuleInit {
//   constructor(
//     private readonly clientsService: ClientsService,
//     private readonly connectionsService: ConnectionsService,
//   ) {}

//   private secret = String(process.env.MIKROTIK_RADIUS_PASS);
//   private port = Number(process.env.MIKROTIK_RADIUS_PORT);
//   private server = createSocket('udp4');

//   onModuleInit() {
//     radius.add_dictionary('public/dictionary.mikrotik');
//     this.onStart();
//   }

//   getAtributes(object: any, key: number) {
//     return object.filter(el=> el.key === 1)[0].data || null
//   }

//   bufferToString(buffer: Buffer) {
//     return Buffer.from(buffer).toString()
//   }

//   chapMatch(cPassword: string, chapPassword: any, challenge: any) {
//     let hash = chapPassword.slice(1);
//     let md5 = crypto.createHash('md5');
//     md5.write(chapPassword.slice(0, 1));
//     md5.write(Buffer.from(cPassword));
//     md5.write(challenge);
//     let calc = md5.digest('hex');
//     return hash.equals(Buffer.from(calc, 'hex'));
//   }

//   async onStart() {

//     this.server.on('message', async (msg, rinfo) => {
//       let packet: iPacket;

//       try {
//         packet = radius.decode({ packet: msg, secret: this.secret });
//         if (packet.code === 'Access-Accept') console.log('connected');
//       } catch (e) {
//         console.log('Failed to decode radius packet, silently dropping:', e);
//         return new Error('ERROR_RADIUS_DECODE');
//       }

//       try {
//         if (packet.code === 'Access-Request') {
//           const username = packet.attributes['User-Name'];
//           const connection = await this.connectionsService.findUserName(username);

//           const atrChapChallenge = packet?.attributes['CHAP-Challenge']
//           const atrChapPassword = packet?.attributes['CHAP-Password']

//           const validPassword = this.chapMatch(connection?.password, atrChapPassword, atrChapChallenge)

//           let response
          
//           if (username == connection?.username && !!validPassword) {

//             const velocid = `${connection?.plan?.upload}M/${connection?.plan?.download}M`;

//             // https://wiki.mikrotik.com/wiki/Manual:RADIUS_Client/vendor_dictionary
          
//             response = radius.encode_response({
//               packet,
//               code: 'Access-Accept',
//               secret: this.secret,
//               attributes: [
//                 ['User-Name', packet.attributes['User-Name']],
//                 ['NAS-Port', packet.attributes['NAS-Port']],
//                 [
//                   'Vendor-Specific',
//                   'Mikrotik',
//                   [
//                     ['Mikrotik-Host-IP', '10.20.10.1'], //packet.attributes['NAS-IP-Address']],
//                     ['Mikrotik-Rate-Limit', velocid],// bust "10M/5M 15M/7M"
//                   ],
//                 ],
//               ],
//             });
//           }
//           else {
//             response = radius.encode_response({
//               packet,
//               code: 'Access-Reject',
//             });            
//           }

//           this.server.send(
//             response,
//             0,
//             response.length || 0,
//             rinfo.port,
//             rinfo.address,
//             (err, bytes) => {
//               if (err) console.log('Error sending response to ', rinfo);
//             },
//           );
//         }
//       } catch (error) {
//         console.log('[decoder error]', error);
//         return new Error('ERROR_RADIUS_DECODE');
//       }
//     }); // -- 'message'

//     this.server.on('listening', () => {
//       const address = this.server.address();
//       console.log(`radius server listening ${address.address}:${address.port}`);
//     }); // -- listening

//     this.server.bind(this.port);
//   }
// }

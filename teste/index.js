const packet = {
  attributes: {
    code: 'Access-Request',
    identifier: 85,
    length: 161,
    authenticator: <Buffer c5 5d 8d 45 af a4 bd 99 ea 49 4a 19 bb 30 e6 63>,
    attributes: {
      'Service-Type': 'Framed-User',
      'Framed-Protocol': 'PPP',
      'NAS-Port': 15728705,
      'NAS-Port-Type': 'Ethernet',
      'User-Name': 'Rodrigo.Adachi',
      'Calling-Station-Id': 'EC:F4:BB:FA:36:C9',
      'Called-Station-Id': '2-pppoe',
      'NAS-Port-Id': '2-Client',
      'Acct-Session-Id': '8160003e',
      'CHAP-Challenge': <Buffer 80 14 3b 41 e8 d1 ef 96 ca ac 6e 68 c7 10 aa 23>,
      'CHAP-Password': <Buffer 01 29 a8 15 3d 8e 66 f1 da f9 e9 76 b8 8f e1 bf 3f>,
      'NAS-Identifier': 'MikroTik',
      'NAS-IP-Address': '192.168.1.254'
    },
    // raw_attributes: [
    //   [ 6, <Buffer 00 00 00 02> ],
    //   [ 7, <Buffer 00 00 00 01> ],
    //   [ 5, <Buffer 00 f0 00 42> ],
    //   [ 61, <Buffer 00 00 00 0f> ],
    //   [ 1, <Buffer 52 6f 64 72 69 67 6f 2e 41 64 61 63 68 69> ],
    //   [ 31, <Buffer 45 43 3a 46 34 3a 42 42 3a 46 41 3a 33 36 3a 43 39> ],
    //   [ 30, <Buffer 32 2d 70 70 70 6f 65> ],
    //   [ 87, <Buffer 32 2d 43 6c 69 65 6e 74> ],
    //   [ 44, <Buffer 38 31 36 30 30 30 33 66> ],
    //   [ 60, <Buffer 9e d1 55 f7 ef db e3 8e 20 73 83 9f 31 cd a5 b8> ],
    //   [ 3, <Buffer 01 94 1f 66 94 1a d9 bd 68 d7 05 a2 c0 0f fa 2e d6> ],
    //   [ 32, <Buffer 4d 69 6b 72 6f 54 69 6b> ],
    //   [ 4, <Buffer c0 a8 01 fe> ]
    // ]
  }
}


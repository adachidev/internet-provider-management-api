export class iAttributes {
  'Calling-Station-Id': string;
  'Called-Station-Id': string;
  'NAS-Port-Id': string;
  'User-Name': string;
  'NAS-Port': string;
  'User-Password': string;
  'Service-Type': string;
  'NAS-Identifier': string;
  'NAS-IP-Address': string;
  'NAS-Port-Type': string;
  'Vendor-Specific': {
    Mikrotik: any;
  };
}

export class iPacket {
  code: string;
  identifier: number;
  length: number;
  attributes: iAttributes;
  authenticator?: BufferEncoding;
}

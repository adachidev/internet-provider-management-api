import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

export class ConnectionsLogDto {
  @IsString()
  id: string;

  @IsString()
  description: string;

  @IsNumber()
  interface: string;

  @IsString()
  username: string;

  @IsBoolean()
  userId: string;

  @IsBoolean()
  ipv4: string;

  @IsString()
  ipv6: string;

  @IsString()
  mac: string;

  @IsString()
  brasId: string;

  @IsString()
  oltId: string;

  @IsString()
  observation: string;

  @IsDate()
  createdAt: Date;
}

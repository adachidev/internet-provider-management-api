import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";
import { ConnectionsDto } from "src/connections/dto/connection.dto";

export class ConnectionsLogDto {
  @IsString()
  id: string;

  @IsString()
  description: string;

  @IsNumber()
  interface: string;

  @IsString()
  username: string;

  @IsString()
  connectDate: Date;

  @IsString()
  disconnectionDate: Date;

  connection: ConnectionsDto;
  
  @IsBoolean()
  connectionId: string;

  @IsBoolean()
  ipv4: string;

  @IsString()
  ipv6lan: string;

  @IsString()
  ipv6wan: string;

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

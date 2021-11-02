import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginServiceDto {
  @IsNotEmpty()
  @ApiProperty()
  client_id: string;

  @IsNotEmpty()
  @ApiProperty()
  client_secret: string;
}

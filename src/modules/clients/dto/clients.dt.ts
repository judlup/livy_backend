import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class ClientsDto {
  @IsNumberString()
  @ApiProperty({ default: 10, required: false })
  limit: number;

  @ApiProperty({ required: false })
  name: string;
}

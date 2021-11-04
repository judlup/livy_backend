import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class PoliciesDto {
  @IsNumberString()
  @ApiProperty({ default: 10, required: false })
  limit: number;

  @IsNumberString()
  @ApiProperty({ default: 1, required: false })
  page: number;
}

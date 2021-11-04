import { Module } from '@nestjs/common';
import { LoginService } from '../login/login.service';
import { PoliciesController } from './policies.controller';
import { PoliciesService } from './policies.service';

@Module({
  controllers: [PoliciesController],
  providers: [PoliciesService, LoginService],
  exports: [PoliciesService],
})
export class PoliciesModule {}

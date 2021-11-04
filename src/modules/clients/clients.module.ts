import { Module } from '@nestjs/common';
import { LoginService } from '../login/login.service';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, LoginService],
  exports: [ClientsService],
})
export class ClientsModule {}

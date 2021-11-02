import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginController } from './modules/login/login.controller';
import { LoginService } from './modules/login/login.service';
import { LoginModule } from './modules/login/login.module';
import { ClientsController } from './modules/clients/clients.controller';
import { ClientsService } from './modules/clients/clients.service';
import { ClientsModule } from './modules/clients/clients.module';

@Module({
  imports: [LoginModule, ClientsModule],
  controllers: [AppController, LoginController, ClientsController],
  providers: [AppService, LoginService, ClientsService],
})
export class AppModule {}

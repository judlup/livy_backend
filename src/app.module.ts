import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginController } from './modules/login/login.controller';
import { LoginService } from './modules/login/login.service';
import { LoginModule } from './modules/login/login.module';
import { ClientsController } from './modules/clients/clients.controller';
import { ClientsService } from './modules/clients/clients.service';
import { ClientsModule } from './modules/clients/clients.module';
import { PoliciesModule } from './modules/policies/policies.module';
import { PoliciesService } from './modules/policies/policies.service';
import { PoliciesController } from './modules/policies/policies.controller';

@Module({
  imports: [LoginModule, ClientsModule, PoliciesModule],
  controllers: [
    AppController,
    LoginController,
    ClientsController,
    PoliciesController,
  ],
  providers: [AppService, LoginService, ClientsService, PoliciesService],
})
export class AppModule {}

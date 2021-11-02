import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginController } from './modules/login/login.controller';
import { LoginService } from './modules/login/login.service';
import { LoginModule } from './modules/login/login.module';

@Module({
  imports: [LoginModule],
  controllers: [AppController, LoginController],
  providers: [AppService, LoginService],
})
export class AppModule {}

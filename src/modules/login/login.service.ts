import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { LoginDto } from './dto/login-dto';
import { LoginServiceDto } from './dto/login-service-dt';
import { ILoginResponse } from './interfaces/ILoginResponse';

@Injectable()
export class LoginService {
  async login(loginDto: LoginDto): Promise<ILoginResponse> {
    const data: LoginServiceDto = {
      client_id: loginDto.username,
      client_secret: loginDto.password,
    };

    const response: ILoginResponse = await axios.post(
      'https://dare-nodejs-assessment.herokuapp.com/api/login',
      data,
    );

    return response;
  }
}

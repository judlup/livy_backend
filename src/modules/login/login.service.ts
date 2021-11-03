import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { LoginDto } from './dto/login-dto';
import { ILoginResponse } from './interfaces/ILoginResponse';
import jwt_decode from 'jwt-decode';

@Injectable()
export class LoginService {
  async login(loginDto: LoginDto): Promise<ILoginResponse> {
    const data = {
      client_id: loginDto.username,
      client_secret: loginDto.password,
    };
    const response = await axios.post(
      'https://dare-nodejs-assessment.herokuapp.com/api/login',
      data,
    );
    const token = response.data['token'];
    const decoded = jwt_decode(token);
    const res = {
      token: response.data['token'],
      type: response.data['type'],
      expires_in: decoded['exp'],
    };
    return res;
  }
}

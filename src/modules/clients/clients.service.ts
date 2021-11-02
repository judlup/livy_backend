import { Injectable } from '@nestjs/common';
import axios from 'axios';
// import { IClients } from './interfaces/IClients';

@Injectable()
export class ClientsService {
  async getClients(): Promise<any> {
    // Array<IClients | any[] | any>
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'bearer TOKEN_PENDING',
    };
    const response = await axios.post(
      'https://dare-nodejs-assessment.herokuapp.com/api/clients',
      { headers: headers },
    );
    console.log(response.data);
    return true;
  }
}

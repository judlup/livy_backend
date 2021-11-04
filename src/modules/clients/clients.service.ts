import { Injectable } from '@nestjs/common';
import axios from 'axios';
// import { IClients } from './interfaces/IClients';
@Injectable()
export class ClientsService {
  async getClients(token: string): Promise<any> {
    const headers = {
      authorization: `${token}`,
    };
    const response = await axios
      .get('https://dare-nodejs-assessment.herokuapp.com/api/clients', {
        headers: headers,
      })
      .catch((err) => {
        if (err.response.data.error.toLowerCase() === 'unauthorized') {
          return err.response.data.error;
        }
      });
    return response.data;
  }
}

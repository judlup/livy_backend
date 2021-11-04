import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IPolicies } from './interfaces/IPolicies';

@Injectable()
export class PoliciesService {
  async getPolicies(token: string): Promise<Array<IPolicies>> {
    const headers = {
      authorization: `${token}`,
    };
    const response = await axios
      .get('https://dare-nodejs-assessment.herokuapp.com/api/policies', {
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

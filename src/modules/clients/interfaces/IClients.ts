import { IPolicies } from 'src/modules/policies/interfaces/IPolicies';

export interface IClients {
  id: string;
  name: string;
  email: string;
  role: string;
  policies?: Array<IPolicies>;
}

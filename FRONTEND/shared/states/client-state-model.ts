import {Client} from '../models/client';
export class ClientStateModel {
  client!: Client;
  jwtToken: String = "";
}

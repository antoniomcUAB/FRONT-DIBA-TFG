import {RoleEnum} from './role.enum';

export class TokenData {
  jti: string;
  aud: string[];
  user_name: string;
  scope: string[];
  exp: number;
  authorities: RoleEnum[];
  client_id: string;
  organizationalUnits: string;
}

import {Role} from './role.model';

export interface Token {
  token: string;
  user?: string;
  roles?: Array<Role>;
}
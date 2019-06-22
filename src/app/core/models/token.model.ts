import {Role} from './role.model';

export class Token {
  constructor(
      public token: string,
      public user?: string,
      public roles?: Array<Role>
  ){} 
}
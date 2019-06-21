import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpService {

  static API_END_POINT = environment.API;

  static UNAUTHORIZED = 401;
  static NOT_FOUND = 404;

  constructor(

  ) { }

  ngOnInit(){
    
  }

}

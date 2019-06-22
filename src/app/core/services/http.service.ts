import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

import { SnackBarNotification } from '../components/snack-bar/snack-bar-notification.service';
import { Observable, throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import { Token } from '../models/token.model';
import { Error } from '../models/error.model';


@Injectable()
export class HttpService {

  static API_END_POINT = environment.API;

  static UNAUTHORIZED = 401;
  static NOT_FOUND = 404;

  private token: Token;
  private headers: HttpHeaders;
  private params: HttpParams;
  private responseType: string;

  private successfulNotification = undefined;
  private requestToken: boolean;
  private printDirectly: boolean;

  constructor(
    private http: HttpClient,
    private snackBarNotification: SnackBarNotification,
    private router: Router
  ) { 
    this.resetOptions();
  }

  login(user: string, password: string, endPoint: string): Observable<any> {
    return this.authBasic(user, password).post(endPoint).pipe(
      map(token => {
        
        token = token.substring(6);

        const helper = new JwtHelperService();

        const decodedToken = helper.decodeToken(token);

        this.token = new Token(token, decodedToken.user, decodedToken.roles);
 
        return  this.token;

      }), catchError(error => {
        return this.handleError(error);
      })
    );
  }


  logout(): void {
    this.token = undefined;
    this.router.navigate(['']);
  }
  
  getToken(): Token {
    return this.token;
  }

  param(key: string, value: string): HttpService {
    this.params = this.params.append(key, value); // This class is immutable
    return this;
  }

  pdf(printDirectly = true): HttpService {
    this.printDirectly = printDirectly;
    this.responseType = 'blob';
    this.header('Accept', 'application/pdf , application/json');
    return this;
  }

  successful(notification = 'Successful'): HttpService {
    this.successfulNotification = notification;
    return this;
  }

  post(endpoint: string, body?: Object): Observable<any> {
    return this.http.post(HttpService.API_END_POINT + endpoint, body, this.createOptions()).pipe(
      map(response => this.extractData(response)
      ), catchError(error => {
        return this.handleError(error);
      })
    );
  }

  get(endpoint: string): Observable<any> {
    return this.http.get(HttpService.API_END_POINT + endpoint, this.createOptions()).pipe(
      map(response => this.extractData(response)
      ), catchError(error => {
        return this.handleError(error);
      })
    );
  }

  put(endpoint: string, body?: Object): Observable<any> {
    return this.http.put(HttpService.API_END_POINT + endpoint, body, this.createOptions()).pipe(
      map(response => this.extractData(response)
      ), catchError(error => {
        return this.handleError(error);
      })
    );
  }

  patch(endpoint: string, body?: Object): Observable<any> {
    return this.http.patch(HttpService.API_END_POINT + endpoint, body, this.createOptions()).pipe(
      map(response => this.extractData(response)
      ), catchError(error => {
        return this.handleError(error);
      })
    );
  }

  delete(endpoint: string): Observable<any> {
    return this.http.delete(HttpService.API_END_POINT + endpoint, this.createOptions()).pipe(
      map(response => this.extractData(response)
      ), catchError(error => {
        return this.handleError(error);
      })
    );
  }
 
  private authBasic(user: string, password: string): HttpService {
    this.token = undefined;
    this.requestToken = true;
    this.header('Authorization', 'Basic ' + btoa(user + ':' + password));
    return this;
  }
  
  private header(key: string, value: string): HttpService {
    this.headers = this.headers.append(key, value); // This class is immutable
    return this;
  }

  private createOptions(): any {
    if (this.token !== undefined) {
      this.header('Authorization', 'Bearer ' + this.token.token);
    }
    const options: any = {
      headers: this.headers,
      params: this.params,
      responseType: this.responseType,
      observe: 'response'
    };
    this.resetOptions();
    return options;
  }

  private resetOptions(): void {
    this.headers = new HttpHeaders();
    this.params = new HttpParams();
    this.responseType = 'json';
  }

  private extractData(response): any {

    if (this.successfulNotification) {
      this.snackBarNotification.notify(this.successfulNotification);
      this.successfulNotification = undefined;
    }

    if(this.requestToken){
      this.requestToken = false;
      return response.headers.get('Authorization');
    }

    const contentType = response.headers.get('content-type');

    if (contentType) {
      
      if (contentType.indexOf('application/pdf') !== -1) {
        const blob = new Blob([response.body], {type: 'application/pdf'});
        if (this.printDirectly) {
          const iFrame = document.createElement('iframe');
          iFrame.src = URL.createObjectURL(blob);
          iFrame.style.visibility = 'hidden';
          document.body.appendChild(iFrame);
          iFrame.contentWindow.focus();
          iFrame.contentWindow.print();
        } else {
          window.open(window.URL.createObjectURL(blob));
        }
      
      } else if (contentType.indexOf('application/json') !== -1) {
        return response.body; // with 'text': JSON.parse(response.body);
      }
    
    } else {
      return response;
    }
  }

  private handleError(response): any {
    
    let error: Error;

    if (response.status === HttpService.UNAUTHORIZED) {
      
      this.snackBarNotification.notifyError('Unauthorized'/*, 'Error'*/);
      this.logout();
      this.router.navigate(['']);
      return throwError(response.error);

    } else {
      try {
        if (response.status === HttpService.NOT_FOUND) {
          error = {error: 'Not Found', message: '', path: ''};
        } else {
          error = response.error; // with 'text': JSON.parse(response.error);
        }
        this.snackBarNotification.notifyError(error.error + ': ' + error.message/*, 'Error'*/);
        return throwError(error);
      } catch (e) {
        this.snackBarNotification.notifyError('No server response'/*, 'Error'*/);
        return throwError(response.error);
      }
    }
  }

}


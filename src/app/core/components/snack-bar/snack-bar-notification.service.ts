import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SnackBarNotification {

  private notification = new Subject<string>();
  
  public notification$ = this.notification.asObservable();

  constructor() { }

  public notify(message: string){
    this.notification.next(message);
  }

}
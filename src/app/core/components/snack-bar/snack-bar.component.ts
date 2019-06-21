import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { SnackBarNotification } from './snack-bar-notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit, OnDestroy {

  subscriptionNotificationService: Subscription;

  constructor(
    public snackbar: MatSnackBar,
    public snackBarNotification: SnackBarNotification
  ) { }

  ngOnInit() {
    this.subscriptionNotificationService = this.snackBarNotification.notification$.subscribe(
      (notification) => {this.openNotification(notification)}
    )
  }

  private openNotification(message: string){
    
    let config = new MatSnackBarConfig();
    config.duration = 3000;
    
    this.snackbar.open(message, "close", config);
  }

  ngOnDestroy() {
    this.subscriptionNotificationService.unsubscribe();
  }

}

import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-cancel-yes-dialog',
  templateUrl: './cancel-yes-dialog.component.html',
  styleUrls: ['./cancel-yes-dialog.component.scss']
})
export class CancelYesDialogComponent {

  message: string;
  question: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.message = data !== null ? data.message: "Va a realizar una operación peligrosa";
    this.question = data !== null ? data.question : "¿ Desea realizarla ?";
  }
}

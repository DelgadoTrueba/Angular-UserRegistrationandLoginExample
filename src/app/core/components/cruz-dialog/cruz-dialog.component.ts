import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { QuestionBase } from '../dinamic-form/models/question-base';

@Component({
  selector: 'app-cruz-dialog',
  templateUrl: './cruz-dialog.component.html',
  styleUrls: ['./cruz-dialog.component.scss']
})
export class CruzDialogComponent{
  
  action: string;
  resource: string;

  questions: QuestionBase<any>[];

  constructor(
    private dialogRef: MatDialogRef<CruzDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
    ) {
    this.action = data !== null ? data.action: "Action";
    this.resource = data !== null ? data.resource : "Resource";

    this.questions = data !== null ? data.questions : [{}];
  }

  submitValue(event) {
    this.dialogRef.close(event);
  }

}
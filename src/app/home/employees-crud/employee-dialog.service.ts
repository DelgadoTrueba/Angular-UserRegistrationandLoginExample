import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CruzDialogComponent } from 'src/app/core/components/cruz-dialog/cruz-dialog.component';
import { QuestionBase } from 'src/app/core/components/dinamic-form/models/question-base';
import { TextboxQuestion } from 'src/app/core/components/dinamic-form/models/question-textbox';
import { DropdownQuestion } from 'src/app/core/components/dinamic-form/models/question-dropdown';
import { Observable } from 'rxjs';

import {cloneDeep} from 'lodash';
import { IdQuestion } from 'src/app/core/components/dinamic-form/models/question-id';

@Injectable()
export class EmployeeDialogService {

  resource = "Employee";

  idField = new IdQuestion({
    key: 'id',
    label: 'Id',
    order: 1,
  });

  firstaNameField = new TextboxQuestion({
    key: 'firstName',
    label: 'First name',
    order: 2,
    required: true,
  });

  lastaNameField = new TextboxQuestion({
    key: 'lastName',
    label: 'Last name',
    order: 3,
    required: true,
  });

  emailField = new TextboxQuestion({
    key: 'email',
    label: 'Email',
    order: 4,
    required: true,
  });

  fields = [this.idField, this.firstaNameField, this.lastaNameField, this.emailField]
  
  
  constructor(
    private dialog: MatDialog
  ) { }

  createEmployee():  Observable<any>{
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      resource: this.resource,
      action: 'Create',
      questions: this.getCreateEmplQuestions()
    };

    return this.dialog.open(CruzDialogComponent, dialogConfig).afterClosed();        
  }

  readEmployee(employee):  Observable<any>{
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      resource: this.resource,
      action: 'Read',
      questions: this.getReadDeleteEmplQuestions(employee)
    };

    return this.dialog.open(CruzDialogComponent, dialogConfig).afterClosed();        
  }

  updateEmployee(employee):  Observable<any>{
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      resource: this.resource,
      action: 'Update',
      questions: this.getUpdateEmplQuestions(employee)
    };

    return this.dialog.open(CruzDialogComponent, dialogConfig).afterClosed();        
  }

  deleteEmployee(employee):  Observable<any>{
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      resource: this.resource,
      action: 'Delete',
      questions: this.getReadDeleteEmplQuestions(employee)
    };

    return this.dialog.open(CruzDialogComponent, dialogConfig).afterClosed();        
  }

  // TODO: get from a remote source of question metadata
  // TODO: make asynchronous
  getCreateEmplQuestions(){
    return this.getOrderedQuestions(this.fields);
  }

  getReadDeleteEmplQuestions(employee){
      let idField = cloneDeep(this.idField);
      let firstaNameField = cloneDeep(this.firstaNameField);
      let lastaNameField = cloneDeep(this.lastaNameField);
      let emailField = cloneDeep(this.emailField);

      firstaNameField.readonly = true;
      lastaNameField.readonly = true;
      emailField.readonly = true;

      idField.value = employee.id;
      firstaNameField.value = employee.firstName;
      lastaNameField.value = employee.lastName;
      emailField.value = employee.email;


    return this.getOrderedQuestions([idField, firstaNameField, lastaNameField, emailField]);
  }

  getUpdateEmplQuestions(employee){
    let idField = cloneDeep(this.idField);
    let firstaNameField = cloneDeep(this.firstaNameField);
    let lastaNameField = cloneDeep(this.lastaNameField);
    let emailField = cloneDeep(this.emailField);

    idField.value = employee.id;
    firstaNameField.value = employee.firstName;
    lastaNameField.value = employee.lastName;
    emailField.value = employee.email;


  return this.getOrderedQuestions([idField, firstaNameField, lastaNameField, emailField]);
}

  getOrderedQuestions(questionsUnordered) {
  
    let questions: QuestionBase<any>[] = questionsUnordered;
 
    return questions.sort((a, b) => a.order - b.order);
  }

  /*
      new DropdownQuestion({
        key: 'team',
        label: 'Soccer Team',
        options: [
          {key: 'ATM',  value: 'Atletíco de Madrid'},
          {key: 'RM',  value: 'Real Madrid'},
          {key: 'BC',   value: 'Barcelona'},
        ],
        order: 3
      }),
      */
}

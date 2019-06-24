import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './employee.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CruzDialogComponent } from 'src/app/core/components/cruz-dialog/cruz-dialog.component';
import { QuestionBase } from 'src/app/core/components/dinamic-form/models/question-base';
import { TextboxQuestion } from 'src/app/core/components/dinamic-form/models/question-textbox';
import { DropdownQuestion } from 'src/app/core/components/dinamic-form/models/question-dropdown';


@Component({
  selector: 'app-employees-crud',
  templateUrl: './employees-crud.component.html',
  styleUrls: ['./employees-crud.component.scss']
})
export class EmployeesCrudComponent implements OnInit, OnDestroy {
 
  static URL: string = "EmployeesCrud"

  title = 'Employees management';
  columns = ['firstName', 'lastName', 'email'];
  data;

  dialogSubscription;

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.userService.readAll().subscribe((employees) => {
      this.data = employees;
    });
  }

  create(){
    console.log("create");
  }

  read($event){
    console.log("read", $event);
    this.openDialog();
  }

  update($event){
    console.log("update", $event);
  }

  delete($event){
    console.log("delete", $event);
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      resource: "Employee",
      action: 'Create',
      questions: this.getQuestions()
    };

    const dialogRef = this.dialog.open(CruzDialogComponent, dialogConfig);
    
    this.dialogSubscription = dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          console.log(data);
        }
      });
  }

  // TODO: get from a remote source of question metadata
  // TODO: make asynchronous
  getQuestions() {
 
    let questions: QuestionBase<any>[] = [
 
      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        required: true,
        order: 1
      }),

      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2
      }),

      new DropdownQuestion({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          {key: 'solid',  value: 'Solid'},
          {key: 'great',  value: 'Great'},
          {key: 'good',   value: 'Good'},
          {key: 'unproven', value: 'Unproven'}
        ],
        order: 3
      }),
 
    ];
 
    return questions.sort((a, b) => a.order - b.order);
  }

  ngOnDestroy(): void {
    this.dialogSubscription.unsubscribe();
  }

}

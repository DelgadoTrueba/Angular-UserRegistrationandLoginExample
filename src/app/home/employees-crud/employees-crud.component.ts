import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './employee.service';
import { EmployeeDialogService } from './employee-dialog.service';


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

  createEmpDialogSub;
  updateEmpDialogSub;
  readEmpDialogSub;
  deleteEmpDialogSub;

  constructor(
    private userService: UserService,
    private employeeDialogService: EmployeeDialogService,
  ) { }

  ngOnInit() {
    this.userService.readAll().subscribe((employees) => {
      this.data = employees;
    });
  }

  create(){
    console.log("create");

    this.createEmpDialogSub = this.employeeDialogService.createEmployee().subscribe(
      employee => {
        if (employee) {
          console.log(employee);
        }
      });
  }

  read($event){
    console.log("read");

    this.readEmpDialogSub = this.employeeDialogService.readEmployee($event).subscribe(
      employee => {
        if (employee) {
          console.log(employee);
        }
      });
  }

  update($event){
    console.log("update");

    this.updateEmpDialogSub = this.employeeDialogService.updateEmployee($event).subscribe(
      employee => {
        if (employee) {
          console.log(employee);
        }
      });
  }

  delete($event){
    console.log("delete");

    this.deleteEmpDialogSub = this.employeeDialogService.deleteEmployee($event).subscribe(
      employee => {
        if (employee) {
          console.log(employee);
        }
      });
  }

  ngOnDestroy(): void {
    this.createEmpDialogSub.unsubscribe();
    this.readEmpDialogSub.unsubscribe();
    this.updateEmpDialogSub.unsubscribe();
    this.deleteEmpDialogSub.unsubscribe();
  }

}

import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { UserService } from './employee.service';
import { EmployeeDialogService } from './employee-dialog.service';
import { Employee } from './employee.model';


@Component({
  selector: 'app-employees-crud',
  templateUrl: './employees-crud.component.html',
  styleUrls: ['./employees-crud.component.scss']
})
export class EmployeesCrudComponent implements OnInit, OnDestroy {
 
  static URL: string = "EmployeesCrud"

  title = 'Employees management';
  columns = ['firstName', 'lastName', 'email'];

  data: Employee[];

  createEmpDialogSub = null;
  updateEmpDialogSub = null;
  readEmpDialogSub = null;
  deleteEmpDialogSub = null;

  userReadAll = null;
  userUpdate = null;

  constructor(
    private userService: UserService,
    private employeeDialogService: EmployeeDialogService,
  ) { }

  ngOnInit() {
   this.userReadAll = this.userService.readAll().subscribe((employees) => {
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
          
          this.userUpdate = this.userService.update(employee).subscribe( (employeeResponse) => {
            this.data = this.data.map( (empl) => {
              if(empl.id === employeeResponse.id){
                empl = employeeResponse;
              }
              return empl;
            });
          });
    
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
    this.userReadAll.unsubscribe();
    if(this.userUpdate) this.userUpdate.unsubscribe();

    if(this.createEmpDialogSub !== null) this.createEmpDialogSub.unsubscribe();
    if(this.readEmpDialogSub !== null) this.readEmpDialogSub.unsubscribe();
    if(this.updateEmpDialogSub !== null) this.updateEmpDialogSub.unsubscribe();
    if(this.deleteEmpDialogSub !== null) this.deleteEmpDialogSub.unsubscribe();
  }

}

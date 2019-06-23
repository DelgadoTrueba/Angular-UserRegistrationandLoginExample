import { Component, OnInit } from '@angular/core';
import { UserService } from './employee.service';

@Component({
  selector: 'app-employees-crud',
  templateUrl: './employees-crud.component.html',
  styleUrls: ['./employees-crud.component.scss']
})
export class EmployeesCrudComponent implements OnInit {

  static URL: string = "EmployeesCrud"

  title = 'Employees management';
  columns = ['firstName', 'lastName', 'email'];
  data;

  constructor(
    private userService: UserService,
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
  }

  update($event){
    console.log("update", $event);
  }

  delete($event){
    console.log("delete", $event);
  }

}

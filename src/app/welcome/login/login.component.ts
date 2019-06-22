import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public userForm: FormGroup; 

  constructor(
    private _formBuilder: FormBuilder,
  ){ }

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.userForm = this._formBuilder.group({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  userNameRequired(): boolean {
    return this.userForm.controls.userName.errors && this.userForm.controls.userName.errors.required;
  }

  passwordRequired(): boolean {
    return this.userForm.controls.password.errors && this.userForm.controls.password.errors.required;
  }

  onSubmit(){
    console.log(this.userForm.value);
  }

}

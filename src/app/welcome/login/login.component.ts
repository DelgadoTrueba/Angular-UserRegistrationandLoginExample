import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TokensService } from 'src/app/core/services/tokens.service';
import { Router } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  static URL: string = "login";

  public userForm: FormGroup; 

  constructor(
    private _formBuilder: FormBuilder,
    private _tokensService: TokensService,
    private router: Router,
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
    let user: string = this.userForm.value.userName;
    let password: string = this.userForm.value.password;

    this._tokensService.login(user, password).subscribe(
      (token) => {
        //console.log(token)
        this.router.navigate([HomeComponent.URL])
      }
    );
  }

}

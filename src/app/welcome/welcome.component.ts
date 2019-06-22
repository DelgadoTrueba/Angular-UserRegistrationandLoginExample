import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  static URL = 'welcome';
  
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  register(){
    this.router.navigate([WelcomeComponent.URL, RegisterComponent.URL]);
  }

  login(){
    this.router.navigate([WelcomeComponent.URL, LoginComponent.URL]);
  }

  isLoginUrl(){
    return this.router.url === "/welcome/login"
  }

}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './welcome/register/register.component';
import { LoginComponent } from './welcome/login/login.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: WelcomeComponent.URL},
  {
    path: WelcomeComponent.URL, component: WelcomeComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: LoginComponent.URL},
      {path: LoginComponent.URL, component: LoginComponent},
      {path: RegisterComponent.URL, component: RegisterComponent},
    ]
  },
  {path: HomeComponent.URL, component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

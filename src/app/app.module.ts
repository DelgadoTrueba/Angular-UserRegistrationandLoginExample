// <<< Importar Modulos >>>
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';
import { CoreModule } from './core/core.module';
import { ReactiveFormsModule } from '@angular/forms';

// <<< Importar Servicios >>>
import { UserService } from './home/employees-crud/employee.service';
import { EmployeeDialogService } from './home/employees-crud/employee-dialog.service';

// <<< Importar Componentes >>>
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './welcome/login/login.component';
import { RegisterComponent } from './welcome/register/register.component';
import { EmployeesCrudComponent } from './home/employees-crud/employees-crud.component';

@NgModule({
  // Componentes, Pipes y Directivas
  declarations: [
    AppComponent,
    WelcomeComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    EmployeesCrudComponent
  ],
  // Modulos
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,

    BrowserAnimationsModule,
    AppMaterialModule,

    CoreModule,
  ],
  // Servicos
  providers: [
    UserService,
    EmployeeDialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

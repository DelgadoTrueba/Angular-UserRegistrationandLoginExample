// <<< Importar Modulos >>>
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';
import { CoreModule } from './core/core.module';
import { ReactiveFormsModule } from '@angular/forms';


// <<< Importar Componentes >>>
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './welcome/login/login.component';
import { RegisterComponent } from './welcome/register/register.component';

@NgModule({
  // Componentes, Pipes y Directivas
  declarations: [
    AppComponent,
    WelcomeComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// <<< Importar Modulos >>>
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';


// <<< Importar Componentes >>>
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  // Componentes, Pipes y Directivas
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  // Modulos
  imports: [
    BrowserModule,
    AppRoutingModule,

    BrowserAnimationsModule,
    AppMaterialModule,
  ],
  // Servicos
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

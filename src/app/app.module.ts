// <<< Importar Modulos >>>
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app-material.module';
import { CoreModule } from './core/core.module';


// <<< Importar Componentes >>>
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  // Componentes, Pipes y Directivas
  declarations: [
    AppComponent,
    WelcomeComponent,
    HomeComponent
  ],
  // Modulos
  imports: [
    BrowserModule,
    AppRoutingModule,

    BrowserAnimationsModule,
    AppMaterialModule,

    CoreModule,
  ],
  // Servicos
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

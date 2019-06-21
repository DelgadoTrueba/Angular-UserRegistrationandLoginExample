// <<< Importar Modulos >>>
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppMaterialModule } from '../app-material.module';

// <<< Importar Servicios >>>
import { HttpService } from './services/http.service';
import { SnackBarNotification } from './components/snack-bar/snack-bar-notification.service';

// <<< Importar Componentes >>>
import { DateComponent } from './components/date/date.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';

@NgModule({
  // Modulos
  imports: [
    FormsModule,
    HttpClientModule,

    BrowserAnimationsModule,
    AppMaterialModule
  ],
  // Componentes, Pipes y Directivas
  declarations: [
    DateComponent,
    SnackBarComponent,
  ],
  // Exports Componentes, Pipes y Directivas
  exports: [
    DateComponent,
    SnackBarComponent 
  ],
  // Dialog
  entryComponents: [
   
  ],
  // Servicos
  providers: [
    SnackBarNotification,
    HttpService
  ]
})
export class CoreModule {
}
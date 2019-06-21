// <<< Importar Modulos >>>
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppMaterialModule } from '../app-material.module';

// <<< Importar Componentes >>>
import { DateComponent } from './date.component';


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
  ],
  // Exports Componentes, Pipes y Directivas
  exports: [
    DateComponent,
  ],
  // Dialog
  entryComponents: [
   
  ],
  // Servicos
  providers: [
   
  ]
})
export class CoreModule {
}
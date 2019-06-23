// <<< Importar Modulos >>>
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppMaterialModule } from '../app-material.module';

// <<< Importar Servicios >>>
import { HttpService } from './services/http.service';
import { SnackBarNotification } from './components/snack-bar/snack-bar-notification.service';
import { TokensService } from './services/tokens.service';

// <<< Importar Componentes >>>
import { DateComponent } from './components/date/date.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { CancelYesDialogComponent } from './components/cancel-yes-dialog/cancel-yes-dialog.component';
import { CrudComponent } from './components/crud/crud.component';
import { CruzDialogComponent } from './components/cruz-dialog/cruz-dialog.component';

@NgModule({
  // Modulos
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    BrowserAnimationsModule,
    AppMaterialModule
  ],
  // Componentes, Pipes y Directivas
  declarations: [
    DateComponent,
    SnackBarComponent,
    CancelYesDialogComponent,
    CrudComponent,
    CruzDialogComponent,
  ],
  // Exports Componentes, Pipes y Directivas
  exports: [
    DateComponent,
    SnackBarComponent,
    CancelYesDialogComponent,
    CrudComponent,
    CruzDialogComponent
  ],
  // Dialog
  entryComponents: [
    CancelYesDialogComponent,
    CruzDialogComponent
  ],
  // Servicos
  providers: [
    SnackBarNotification,
    HttpService,
    TokensService
  ]
})
export class CoreModule {
}
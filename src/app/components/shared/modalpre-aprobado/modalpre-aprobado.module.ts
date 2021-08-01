import { MatFormFieldModule  } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ModalpreAprobadoComponent } from '../modalpre-aprobado/modalpre-aprobado.component';
import { MatButtonModule, MatDialogModule, MatInputModule, MatSelectModule } from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { CurrencyMaskModule } from 'ng2-currency-mask';

 const imports = [
  BrowserModule,
  CommonModule,
  // RouterModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSelectModule,
  FormsModule,
  ReactiveFormsModule,
  MatDialogModule,
  MatDatepickerModule,
  MatCheckboxModule,
  CurrencyMaskModule,
  MatInputModule
 ];

const providers = [];

@NgModule({
  declarations: [ModalpreAprobadoComponent],
  entryComponents: [ModalpreAprobadoComponent],
  exports: [ModalpreAprobadoComponent],
  imports: imports,
  providers: providers,
  // schemas: [NO_ERRORS_SCHEMA],
})
export class ModalpreaprobadoModule {}

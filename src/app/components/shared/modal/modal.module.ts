import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from 'src/material/material.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';



const Inports = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  MatButtonModule,
  MaterialModule,
  CurrencyMaskModule
]
const Declarations = [
  ModalComponent
]

@NgModule({
  declarations: [
    Declarations
  ],
  entryComponents: [
    ModalComponent
  ],
  exports: [
    ModalComponent
  ],
  imports: [
    Inports
  ]
})
export class ModalModule {

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalinfoComponent } from 'src/app/components/shared/modal-Info/modalinfo.component';
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
  ModalinfoComponent
]

@NgModule({
  declarations: [
    Declarations
  ],
  entryComponents: [
    ModalinfoComponent
  ],
  exports: [
    ModalinfoComponent
  ],
  imports: [
    Inports
  ]
})
export class ModalModuleInfo {

}

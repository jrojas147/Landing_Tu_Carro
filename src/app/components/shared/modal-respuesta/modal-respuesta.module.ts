import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalRespuestaComponent } from './modal-respuesta.component';


const Imports = [
  CommonModule
];
const providers = [];


@NgModule({
  declarations: [ModalRespuestaComponent],
  entryComponents: [ModalRespuestaComponent],
  exports: [ModalRespuestaComponent],
  imports: [ Imports ],
  providers: providers,
})
export class ModalRespuestaModule { }

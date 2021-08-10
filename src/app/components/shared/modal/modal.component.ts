import { Component, OnInit, Inject } from '@angular/core';
import { constantes } from 'src/constants/constantes';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { HttpClient } from '@angular/common/http';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DatosPreAprobado } from 'src/app/interfaces/datosPreAprobado';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms'
import * as moment from 'moment';
import { FormularioPreAprobadoServiceService } from 'src/app/services/formulario-pre-aprobado.service.service';





@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  const = constantes;
  titulovalidado: string;
  mensajevalidado: string;
  // tipoModal: string = 'Generico'
  // modalGenerico: boolean = false;
  // modalPreaprobado: boolean =false;
  // wppba: boolean;
  // empba:boolean;
  formulario_Empleado: FormGroup;//
  Independiente = false;//
  messageBody: string = '';//
  stepFinish: boolean;//
  maxDate = new Date();
  MinDate = moment().subtract(80, 'year');
  dialog: any;
  ejecutarFormularioPreaprobado: boolean;
  confirmSalir: boolean = false;


  constructor(
    private dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dataModRespuesta: {
      Titulo: string,
      Mensaje: string,
      sentEmail: boolean,
      sendWhatsapp: boolean,
      tipoModal: string,
      datacentrales : any,
      ejecutarFormularioPreaprobado: boolean
     },
      private fb: FormBuilder,//
      private http: HttpClient,//
      public DataFormualrioPreaprobado: FormularioPreAprobadoServiceService
     ) {//
  }

  ngOnInit() {
     this.dirigirWhatsapp();
     const Pba = this.dataModRespuesta.datacentrales;
     this.Independiente = this.dataModRespuesta.datacentrales.DatosFinancieros.ActividadEconomica === 2 ? true : false;
     this.initFormulario_Empleados();//
  }

  initFormulario_Empleados() {
    this.formulario_Empleado = this.fb.group({//
       Fecha_Nacimiento: new FormControl("", Validators.required),
       Lugar_Nacimiento: new FormControl("", Validators.required),
       Fecha_Expedicion_Documento: new FormControl("", Validators.required),
       Lugar_Expedicion_Documento: new FormControl("", Validators.required),
       Numero_Personas_Cargo: new FormControl(""),
       Estado_Civil: new FormControl("", Validators.required),
       Estrato: new FormControl("", Validators.required),
       Direccion: new FormControl("", Validators.required),
       Barrio: new FormControl("", Validators.required),
       Ciudad: new FormControl("", Validators.required),
       Tipo_Vivienda: new FormControl("", Validators.required),
       Tiempo_Laborado_Empresa: new FormControl(null, !this.Independiente ? [Validators.required]: []),
       Cargo: new FormControl(null, !this.Independiente ? [Validators.required]: []),
       Tipo_Contrato: new FormControl(null, !this.Independiente ? [Validators.required]: []),
       Tiempo_Actividad_Independinente: new FormControl(null, this.Independiente ? [Validators.required]: []),
       Tipo_Actividad_Independiente: new FormControl(null, this.Independiente ? [Validators.required]: []),
       Activos: new FormControl("", Validators.required),
       Pasivos: new FormControl("", Validators.required),
       Egresos: new FormControl("", Validators.required),
       Nombre_Referencia_1_P: new FormControl("", Validators.required),
       Contacto_Referencia_1_P: new FormControl("", Validators.required),
       Nombre_Referencia_1_F: new FormControl("", Validators.required),
       Contacto_Referencia_1_F: new FormControl("", Validators.required),
    });
  }


  onsubmit() {
    const datosFormulario = this.formulario_Empleado.value;
    this.messageBody = '¡Estoy a punto de cumplir mi sueño!' + '\n' + '\n';
    this.messageBody = this.messageBody + 	'Para eso les envío los datos solicitados y la documentación requerida para obtener mi crédito vehicular:' + '\n' + '\n';
    this.messageBody = this.messageBody + 'Nombre:  ' + this.dataModRespuesta.datacentrales.DatosBasicos.Nombre1 + '\n';
    this.messageBody = this.messageBody + 'Tipo Documento:  ' + this.dataModRespuesta.datacentrales.DatosBasicos.TipoDocumento + '\n';
    this.messageBody = this.messageBody + 'Número Documento:  ' + this.dataModRespuesta.datacentrales.DatosBasicos.NumeroDocumento + '\n';
    this.messageBody = this.messageBody + 'Celular:  ' + this.dataModRespuesta.datacentrales.DatosBasicos.Celular + '\n';
    this.messageBody = this.messageBody + 'Email:  ' + this.dataModRespuesta.datacentrales.DatosBasicos.CorreoPersonal + '\n';
    this.messageBody = this.messageBody + 'Ingresos:  ' + this.dataModRespuesta.datacentrales.DatosFinancieros.IngresoMensual + '\n';

    Object.keys(this.formulario_Empleado.controls).forEach(field => {
      const control = this.formulario_Empleado.get(field);

      if (control.value) {
        if (field === 'Fecha_Nacimiento' || field === 'Fecha_Expedicion_Documento') {
          this.messageBody = this.messageBody + (field + ':  ' + moment(control.value).format('DD/MM/YYYY') + '\n');
        } else {
          this.messageBody = this.messageBody + (field + ':  ' + control.value + '\n');
        }
      }
    });

    const mailToLink = "mailto:digital@santanderconsumer.co?subject=Soy-preaprobado&body=" + encodeURIComponent(this.messageBody);
    window.location.href = mailToLink;
  }

  validateTypeDocument(typeDocument: number) {
    let nameIdetificacion;
    switch (typeDocument) {
      case 1:
        nameIdetificacion = 'Cedula de ciudadania';
        break;
      case 2:
        nameIdetificacion = 'Cedula de extrajeria';
        break;
    }
    return nameIdetificacion;
  }
  patternCoincide(event, value) {
    const pattern =  new RegExp(value);
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  //Chat Whatsapp
  ConectarWhatsapp() {
    window.open("https://cariai.com/santanderdigitalchannel/santanderdigitalchannel");
  }

  dirigirWhatsapp(){
    if( this.dataModRespuesta.sendWhatsapp === true ){
      setTimeout( () => {
        this.ConectarWhatsapp();
      },5000)
    }
  }

  procesarFormulario(){
    this.dataModRespuesta.ejecutarFormularioPreaprobado = true;
    this.dialogRef.close(this.dataModRespuesta.ejecutarFormularioPreaprobado)
  }

  ConfirmacionSalir(){
    this.confirmSalir = true;
    this.dataModRespuesta.tipoModal = ''
  }




   cerrar(): void {
     this.dialogRef.close();
   }

}

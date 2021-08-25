import { DatosFinancieros } from './../../../interfaces/datos-financieros';
import { Component, OnInit, Inject } from '@angular/core';
import { constantes } from 'src/constants/constantes';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { HttpClient } from '@angular/common/http';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DatosPreAprobado } from 'src/app/interfaces/datosPreAprobado';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms'
import * as moment from 'moment';
import { FormularioPreAprobadoServiceService } from 'src/app/services/formulario-pre-aprobado.service.service';
import { ModalinfoComponent } from '../modal-Info/modalinfo.component';
import { CentralesRiesgoService } from 'src/app/services/centrales-riesgo.service';






@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  const = constantes;
  titulovalidado: string;
  mensajevalidado: string;
  formulario_Empleado: FormGroup;//
  Independiente = false;//
  messageBody: string = '';//
  stepFinish: boolean;//
  maxDate = new Date();
  MinDate = moment().subtract(80, 'year');
  ejecutarFormularioPreaprobado: boolean = false;
  confirmSalir: boolean = false;
  ModalConfirmSalir: boolean = false;
  ModalAvisoDocumentos: boolean = false;
  tituloModalInfo: string = '';
  mensajeModalInfo: string = '';
  mensajeModalInfo2: string = '';
  tipoDocumento: string = '';
  actividadEconomica: string = '';


  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<ModalComponent>,
    public DataFormualrioPreaprobado: FormularioPreAprobadoServiceService,
    public centralesRiesgo: CentralesRiesgoService,
    private fb: FormBuilder,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public dataModRespuesta: {
      datacentrales : any,
      Titulo: string,
      Mensaje: string,
      tipoModal: string,
      sentEmail: boolean,
      sendWhatsapp: boolean,
     }
     ) {  }

  ngOnInit(): void {
     this.dirigirWhatsapp();
     this.dirigirForPreAprobado();
     this.Independiente = this.dataModRespuesta.datacentrales.DatosFinancieros.ActividadEconomica === 2 ? true : false;
     this.initFormulario_Empleados();
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
    if ( this.dataModRespuesta.datacentrales.DatosBasicos.TipoDocumento === 1 ){
      this.tipoDocumento = "Cédula de Ciudadanía"}
    if ( this.dataModRespuesta.datacentrales.DatosBasicos.TipoDocumento === 2 ){
      this.tipoDocumento = "Cédula de Extranjería"}
    if ( this.dataModRespuesta.datacentrales.DatosBasicos.TipoDocumento === 3 ){
      this.tipoDocumento = "NIT"}
      this.messageBody = this.messageBody + 'Tipo Documento:  ' + this.tipoDocumento +  '\n';
    this.messageBody = this.messageBody + 'Número Documento:  ' + this.dataModRespuesta.datacentrales.DatosBasicos.NumeroDocumento + '\n';
    if ( this.dataModRespuesta.datacentrales.DatosFinancieros.ActividadIndependiente === 15 ){
      this.actividadEconomica = "Pensionado"}
    if ( this.dataModRespuesta.datacentrales.DatosFinancieros.ActividadIndependiente === 16 ){
      this.actividadEconomica = "Empleado"}
    if ( this.dataModRespuesta.datacentrales.DatosFinancieros.ActividadIndependiente === 3  ){
      this.actividadEconomica = "Independiente"}
    this.messageBody = this.messageBody + 'Tipo Actividad Economica:  ' + this.actividadEconomica + '\n';
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

  dirigirWhatsapp(){
        if (this.centralesRiesgo.sendWhatsapp){
      setTimeout( () => {
        this.ConectarWhatsapp();
      },5000)
    }
  }

  ConectarWhatsapp() {
    window.open("https://cariai.com/santanderdigitalchannel/santanderdigitalchannel");
  }

  dirigirForPreAprobado(){
    if (this.dataModRespuesta.sentEmail){
      setTimeout( () => {
        this.procesarFormulario();
      },5000)
    }
  }

  procesarFormulario(){
    this.dataModRespuesta.tipoModal = 'FormularioPreAprobado';
    this.dialogRef.close(this.ejecutarFormularioPreaprobado = true)
 }

  ConfirmacionSalir(){
    this.confirmSalir = true;
    this.dataModRespuesta.tipoModal = ''
  }
   cerrar(): void {
     this.dialogRef.close();
   }

   ProcesarSalir(){
    this.ModalAvisoDocumentos = false;
    this.ModalConfirmSalir = true;
    this.mensajeModalInformativo();
    this.ejecutarModalAvisoSalir();
 }

 ProcesarAvisoDocumentos(){
   this.ModalConfirmSalir = false,
   this.ModalAvisoDocumentos = true
   this.mensajeModalInformativo();
   this.ejecutarModalAvisoDocumentos();

 }

 mensajeModalInformativo(){
  if(this.ModalConfirmSalir){
    this.tituloModalInfo = 'Deseas salir sin finalizar'
    this.mensajeModalInfo = 'Estas seguro que deseas salir sin finalizar tu solicitud'
  }
  if(this.ModalAvisoDocumentos){
   this.tituloModalInfo = 'Recuerda adjuntar los siguientes documentos:'
   this.mensajeModalInfo = 'Si eres empleado a término indefinido, fijo o por obra/labor antiguedad mayor a 12 meses, debes enviar el/los certificado(s) que lo demuestren.'
   this.mensajeModalInfo2 = 'Si eres empleado por prestación de servicios debes haber trabajado los últimos 24 meses y debes enviar el/los contrato(s) o carta laboral y enviar los últimos 3 extractos bancarios.'
  }
}

ejecutarModalAvisoSalir(){
  const dialogRef =this.dialog.open(ModalinfoComponent, {
    data: {
      titulo : this.tituloModalInfo,
      mensaje : this.mensajeModalInfo,
      mensaje2: this.mensajeModalInfo2,
      tipoModalSalir : this.ModalConfirmSalir,
      tipoModalDocumentos : this.ModalAvisoDocumentos
    },
    disableClose : true,
     height: '230px',
     width: '350px',
  });
  dialogRef.afterClosed().subscribe(result  =>{
    if (result && this.ModalConfirmSalir){
      this.cerrar();
    }
  })
}

ejecutarModalAvisoDocumentos(){
  const dialogRef =this.dialog.open(ModalinfoComponent, {
    data: {
      titulo : this.tituloModalInfo,
      mensaje : this.mensajeModalInfo,
      mensaje2: this.mensajeModalInfo2,
      tipoModalDocumentos : this.ModalAvisoDocumentos
    },
    disableClose : true,
     height: '290px',
     width: '570px',
  });
  dialogRef.afterClosed().subscribe(result  =>{
    if (result && this.ModalConfirmSalir){
      this.cerrar();
    }
    if (result && this.ModalAvisoDocumentos ){
      this.onsubmit();
    }
  })
}


}

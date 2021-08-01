import { HttpClient } from '@angular/common/http';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { constantes } from '../../../../constants/constantes';
import { FormularioPreAprobadoServiceService } from '../../../services/formulario-pre-aprobado.service.service'
import * as moment from 'moment';

@Component({
  selector: 'app-modalpre-aprobado',
  templateUrl: './modalpre-aprobado.component.html',
  styleUrls: ['./modalpre-aprobado.component.scss'],
  animations: [
    trigger('animationFadeOut', [
      transition(':enter', [
        style({ opacity: '1' }),
        animate(300)
      ]),
      transition(':leave', [
        animate(300, style({ opacity: '0' }))
      ]),
      state('*', style({ opacity: '1' })),
    ])
  ]

})
export class ModalpreAprobadoComponent implements OnInit {
  formulario_Empleado: FormGroup;
  stepFinish: boolean;
  const = constantes;
  Actividad = 'Empleado';
  Empleado = false;
  Independiente = false;
  resultado: number;
  messageBody: string = '';
  maxDate = new Date();
  MinDate = moment().subtract(80, 'year');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public DataFormualrioPreaprobado: FormularioPreAprobadoServiceService,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.Independiente = this.DataFormualrioPreaprobado.dataformulario.DatosFinancieros.ActividadEconomica === 2 ? true : false;
    this.initFormulario_Empleados();

  }
  initFormulario_Empleados() {
    this.formulario_Empleado = this.fb.group({
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
    this.messageBody = this.messageBody + 'Nombre:  ' + this.data.DatosBasicos.Nombre + '\n';
    this.messageBody = this.messageBody + 'Tipo Documento:  ' + this.validateTypeDocument(this.data.DatosBasicos.TipoDocumento) + '\n';
    this.messageBody = this.messageBody + 'Número Documento:  ' + this.data.DatosBasicos.NumeroDocumento + '\n';
    this.messageBody = this.messageBody + 'Celular:  ' + this.data.DatosBasicos.Celular + '\n';
    this.messageBody = this.messageBody + 'Email:  ' + this.data.DatosBasicos.CorreoPersonal + '\n';
    this.messageBody = this.messageBody + 'Ingresos:  ' + this.data.DatosFinancieros.IngresoMensual + '\n';

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

  goToFinish() {
    this.stepFinish = true;
  }
}

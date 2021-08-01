import { Injectable } from '@angular/core';
import { ContactoFormularioPreAprobado } from '../interfaces/contactoFormularioPreAprobado';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormularioPreAprobadoServiceService {

  dataformulario: ContactoFormularioPreAprobado ={
    DatosBasicos: {
      TipoDocumento: null,
      NumeroDocumento: null,
      Nombre1: null,
      ValorVehiculo: null,
      Celular: null,
      CorreoPersonal: null,
      CuotaInicial: null,
      Plazo: null
    },
    DatosFinancieros:{
      ActividadEconomica: null,
      ActividadIndependiente: 3,
      IngresoMensual: null
    },
    DatosPreAprobado:{
      Fecha_Nacimiento: null,
      Lugar_Nacimiento: null,
      Fecha_Expedicion_Documento: null,
      Lugar_Expedicion_Documento: null,
      Numero_Personas_Cargo: null,
      Estado_Civil: null,
      Estrato: null,
      Direccion: null,
      Barrio: null,
      Ciudad: null,
      Tipo_Vivienda: null,
      Tiempo_Laborado_Empresa: null,
      Cargo: null,
      Tipo_Contrato: null,
      Tiempo_Actividad_Independinente: null,
      Tipo_Actividad_Independiente: null,
      Activos: null,
      Pasivos: null,
      Egresos: null,
      Nombre_Referencia_1_P: null,
      Contacto_Referencia_1_P: null,
      Nombre_Referencia_1_F: null,
      Contacto_Referencia_1_F: null
    }
  };
  constructor(private http: HttpClient) { }
}

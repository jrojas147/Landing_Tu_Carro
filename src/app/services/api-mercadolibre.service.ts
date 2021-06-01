import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { constantes } from 'src/constants/constantes';
import { CentralesRiesgoService } from './centrales-riesgo.service';

@Injectable({
  providedIn: 'root'
})
export class ApiMercadolibreService {

  idVehiculo: string;
  infoVehiculo = [];
  mostrarModalTyc = false;
  errorApi = false;
  desaparecerDetallesMobile = false;
  numeroError: number;

  constructor(public http: HttpClient,
              public centralesRiesgo: CentralesRiesgoService
    ) { }

    obtenerIdVehiculo(value) {
      if (value.match(/MCO-(.*?)(-|$)/)) {
      this.idVehiculo = 'MCO' + value.match(/MCO-(.*?)(-|$)/)[1];
      this.getInfoVehiculo(this.idVehiculo);
      } else {
        this.setSeleccionMensaje(1);
      }
      setTimeout(() => {
        this.centralesRiesgo.cargador = false;
      }, 3000);
    }

    usarIdVehiculo(value: string) {
      if (value) {
      this.idVehiculo = value;
      this.getInfoVehiculo(this.idVehiculo);
      } else {
        this.setSeleccionMensaje(1);
      }
      setTimeout(() => {
        this.centralesRiesgo.cargador = false;
      }, 3000);
  }

  getInfoVehiculo(idVehiculo: string) {
      const url = `${environment.urlApi}${idVehiculo}`;
      return this.http.get(url);
      }

  volverNavegador() {
    if (window.history.go(-1) !== undefined) {
    window.history.go(-1);
    } else {
      window.location.href = constantes.redirectMercadolibre;
    }
  }

  setSeleccionMensaje(value) {
    this.numeroError = value;
    this.errorApi = true;
  }

}

import { Component, OnInit } from '@angular/core';
import { ApiMercadolibreService } from 'src/app/services/api-mercadolibre.service';
import { constantes } from 'src/constants/constantes';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CentralesRiesgoService } from 'src/app/services/centrales-riesgo.service';

@Component({
  selector: 'app-detalles-vehiculo',
  templateUrl: './detalles-vehiculo.component.html',
  styleUrls: ['./detalles-vehiculo.component.scss'],
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
export class DetallesVehiculoComponent  {

  infoVehiculo: any;
  informacion: any = [];

  constructor(public apiMercadolibre: ApiMercadolibreService,
              public centralesRiesgo: CentralesRiesgoService
    ) {
    setTimeout(() => {
    if (this.apiMercadolibre.idVehiculo) {
          this.obtenerInfoVehiculo();
    }
    }, 200);
   }

  obtenerInfoVehiculo() {
    this.apiMercadolibre.getInfoVehiculo(this.apiMercadolibre.idVehiculo)
    .subscribe(infoVehiculo => {
      this.apiMercadolibre.infoVehiculo = this.infoVehiculo;
      this.infoVehiculo = infoVehiculo;
      constantes.idInformacion.forEach((item, index) => {        
        const propiedad = {nombre: '', valor: ''};
        propiedad.nombre = item;
        propiedad.valor = this.obtenerNombreValue(item);
        this.informacion.push(propiedad);
        });
    }, ( error ) => {
        this.apiMercadolibre.errorApi = true;
    });
  }

  obtenerNombreValue(nameTexto: string) {
    const objeto = this.infoVehiculo.attributes.find((item: any) => item.name === nameTexto);
    if(nameTexto == 'Año'){
      let model;

      switch (objeto.value_name) {

          case '2010':
          model = 6;
          break;

          case '2011':
          model = 7;
          break;

          case '2012':
          model = 8;
          break;

          case '2013':
          model = 9;
          break;

          case '2014':
          model = 10;
          break;

          case '2015':
          model = 11;
          break;

          case '2016':
          model = 12;
          break;

          case '2017':
          model = 13;
          break;

          case '2018':
          model = 14;
          break;

          case '2019':
          model = 15;
          break;

          case '2020':
          model = 16;
          break;

          case '2021':
          model = 17;
          break;

          case '2022':
          model = 18;
          break;
      
        default:
          break;
      }

      this.centralesRiesgo.modeloCarro = model;
      
      
    }
    return objeto.value_name;
  }

}

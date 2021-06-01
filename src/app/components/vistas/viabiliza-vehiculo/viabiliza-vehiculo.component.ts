import { Component, OnInit } from '@angular/core';
import { ApiMercadolibreService } from 'src/app/services/api-mercadolibre.service';
import { CentralesRiesgoService } from 'src/app/services/centrales-riesgo.service';
import { constantes } from 'src/constants/constantes';

@Component({
  selector: 'app-viabiliza-vehiculo',
  templateUrl: './viabiliza-vehiculo.component.html',
  styleUrls: ['./viabiliza-vehiculo.component.scss']
})
export class ViabilizaVehiculoComponent implements OnInit {
  infoVehiculo: any;
  vehiculoAno: number;
  informacion: any = [];
  isViable: boolean;
  noViable: boolean;
  const = constantes;

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
          const propiedad = { nombre: '', valor: '' };
          propiedad.nombre = item;
          propiedad.valor = this.obtenerNombreValue(item);
          if (item === 'Año') {
            this.validarViabilidad(parseInt(propiedad.valor));
          }
          this.informacion.push(propiedad);
        });
      }, (error) => {
        this.apiMercadolibre.errorApi = true;
      });
  }

  ngOnInit() {
  }

  validarViabilidad(value: number) {
    if (value < 2010) {
      this.isViable = false;
      this.noViable = true;
    } else {
      this.noViable = false;
      this.isViable = true;
    }
  }

  obtenerNombreValue(nameTexto: string) {
    const objeto = this.infoVehiculo.attributes.find((item: any) => item.name === nameTexto);
    if (nameTexto == 'Año') {
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

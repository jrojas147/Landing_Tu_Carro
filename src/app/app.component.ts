import { Component, OnInit } from '@angular/core';
import { ApiMercadolibreService } from './services/api-mercadolibre.service';
import { CentralesRiesgoService } from './services/centrales-riesgo.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ScanparamsService } from './services/scanparams.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
export class AppComponent implements OnInit {
  idVehiculo: string;
  urlVehiculo = document.referrer;
  /* urlVehiculo: string = "https://articulo.tucarro.com.co/MCO-558397266-brilliance-2020-v3-_JM#promoted-items-new=0"; */
  activarVistaError = false;
  contador: number = 0;
  splash: boolean;

  constructor(public apiMercadolibre: ApiMercadolibreService,
              public centralesRiesgo: CentralesRiesgoService,
              public scanParams: ScanparamsService
              ) {
  }

  public ngOnInit() {
      this.centralesRiesgo.urlVehiculo = this.urlVehiculo;
      this.scanParams.getParamIdVehiculo().subscribe((data: any) => {
          this.contador = this.contador + 1;
          if (data.idvehiculo && this.contador > 1) {
            if (data.idvehiculo) {
              this.idVehiculo = data.idvehiculo;
              this.apiMercadolibre.usarIdVehiculo(this.idVehiculo);
            } else {
              this.apiMercadolibre.obtenerIdVehiculo(this.urlVehiculo);
            }
          }
          setTimeout(() => {
            this.centralesRiesgo.cargador = false;
          }, 3000);
      });
      this.scanParams.getParams();
      this.animasplash();
      this.centralesRiesgo.cargador = true;
  }

  animasplash() {
    this.splash = true;
    setTimeout(() => {
    this.splash = false;
    }, 2000);
  }
}


import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiMercadolibreService } from './api-mercadolibre.service';

@Injectable({
  providedIn: 'root'
})
export class ScanparamsService {

  enriquecido = false;
  idVehiculo: string;
  utm: string;
  idc: number;
  idv: number;

  constructor(private route: ActivatedRoute,
              public apiMercadolibre: ApiMercadolibreService
              ) { }

    getParamIdVehiculo() {
    return this.route.queryParams;
  }
    getParams() {
      this.route.queryParams.subscribe((data: any) => {
      if (data.fuente === 'enriquecido') {
        this.enriquecido = true;
      }
      if (data.utm_source) {
        this.utm = data.utm_source;
      }
      if (data.idc) {
        this.idc = Number(data.idc);
      }
      if (data.idv) {
        this.idv = Number(data.idv);
      }
    });
  }
}

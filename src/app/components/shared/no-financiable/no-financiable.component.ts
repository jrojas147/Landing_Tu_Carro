import { Component } from '@angular/core';
import { ApiMercadolibreService } from 'src/app/services/api-mercadolibre.service';
import { constantes } from 'src/constants/constantes';

@Component({
  selector: 'app-no-financiable',
  templateUrl: './no-financiable.component.html',
  styleUrls: ['./no-financiable.component.scss']
})
export class NoFinanciableComponent {
  const = constantes;
  constructor(public apiMercadolibre: ApiMercadolibreService){

  }
}

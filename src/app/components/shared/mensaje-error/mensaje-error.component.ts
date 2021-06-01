import { Component, OnInit } from '@angular/core';
import { constantes } from 'src/constants/constantes';
import { ApiMercadolibreService } from 'src/app/services/api-mercadolibre.service';

@Component({
  selector: 'app-mensaje-error',
  templateUrl: './mensaje-error.component.html',
  styleUrls: ['./mensaje-error.component.scss']
})
export class MensajeErrorComponent implements OnInit {

  const = constantes;
  /* errorSinInternet = false; */

  constructor(public apiMercadolibre: ApiMercadolibreService) { }

  ngOnInit() {
  }

}

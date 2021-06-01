import { Component, OnInit } from '@angular/core';
import { ScanparamsService } from 'src/app/services/scanparams.service';
import { constantes } from 'src/constants/constantes';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {

  const = constantes;

  constructor(
    public scanParams: ScanparamsService
  ) { }

  ngOnInit() {
  }

}

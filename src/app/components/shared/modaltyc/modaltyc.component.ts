import { Component } from '@angular/core';
import { constantes } from 'src/constants/constantes';
import { ApiMercadolibreService } from 'src/app/services/api-mercadolibre.service';
import { FormularioViabilizacionComponent } from 'src/app/components/formulario-viabilizacion/formulario-viabilizacion.component';

@Component({
  selector: 'app-modaltyc',
  templateUrl: './modaltyc.component.html',
  styleUrls: ['./modaltyc.component.scss']
})
export class ModaltycComponent {

  const = constantes;

  constructor(public apiMercadolibre: ApiMercadolibreService, public formularioViable: FormularioViabilizacionComponent) { }

  toggleMostrarModal() {
    this.apiMercadolibre.mostrarModalTyc = !this.apiMercadolibre.mostrarModalTyc;
  }

  toggleAceptaTyc() {
    this.formularioViable.segundo.controls.AutorizaConsultaCentrales.setValue(true);
    this.toggleMostrarModal();
  }

}

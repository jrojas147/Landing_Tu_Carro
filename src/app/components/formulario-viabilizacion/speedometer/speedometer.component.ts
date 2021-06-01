import { Component, Input, OnInit } from '@angular/core';
import { ApiCalculadoraService } from 'src/app/services/api-calculadora.service';
import { FormControl } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { constantes } from 'src/constants/constantes';
import { CentralesRiesgoService } from 'src/app/services/centrales-riesgo.service';

@Component({
  selector: 'app-speedometer',
  templateUrl: './speedometer.component.html',
  styleUrls: ['./speedometer.component.scss']
})
export class SpeedometerComponent implements OnInit {
  @Input() modelCarro: any;
  canvasWidth = 400;
  canvasHeight = 100;
  needleValue = 15;
  centralLabel = '';
  const = constantes;
  options = {
    hasNeedle: true,
    needleColor: '#bd1414',
    needleUpdateSpeed: 500,
    arcColors: ['transparent']
  };
  modelSelected: any;
  periodo = new FormControl(48);
  checkPlazos: any;
  informacionPagar: any;
  cssPlazo: string; 

  constructor(public calculadoraServicio: ApiCalculadoraService,
    public breakpointObserver: BreakpointObserver, public centralesRiesgo: CentralesRiesgoService) {

    // this.cambioResultadoCalculadora();

    breakpointObserver.observe([
      '(max-width: 576px)'
    ]).subscribe(result => {
      if (result.matches) {
        this.canvasWidth = 270;
        this.canvasHeight = 200;
      }
    });

  }

  ngOnInit() {
    // this.informacionPagar = this.calculadoraServicio.resultadoCalculadora.resultadoCuota[0];
    this.modelSelected = this.const.validatorModels.find(x=> x.value == this.modelCarro.value_name);
    
    this.periodo.valueChanges.subscribe(value => this.cambioVelocimetro(value));
    this.cambioResultadoCalculadora();
  }

  validadPlazos() {
    this.checkPlazos = [];
    this.informacionPagar = this.calculadoraServicio.resultadoCalculadora.resultadoCuota[0];
    for (let i = 0; i < this.modelSelected.plazo; i++) {
      this.checkPlazos.push(this.calculadoraServicio.resultadoCalculadora.resultadoCuota[i]);
    }
    this.calculadoraServicio.resultadoCalculadora.resultadoCuota = this.checkPlazos;
    this.cssPlazo = 'radioGroup' + (this.modelSelected.plazo === 2 ? '2' : this.modelSelected.plazo === 3 ? '3' : '');
  }

  cambioVelocimetro(value) {
    switch (value) {
      case 48:
        this.needleValue = 13;
        this.informacionPagar = this.calculadoraServicio.resultadoCalculadora.resultadoCuota[0];
        this.centralesRiesgo.plazo = 4;
        break;

      case 60:
        this.needleValue = this.modelSelected.plazo === 2 ? 87 : this.modelSelected.plazo === 3 ? 50 : 37;
        this.informacionPagar = this.calculadoraServicio.resultadoCalculadora.resultadoCuota[1];
        this.centralesRiesgo.plazo = 5;
        break;

      case 72:
        this.needleValue = this.modelSelected.plazo === 3 ? 87 : 65;
        this.informacionPagar = this.calculadoraServicio.resultadoCalculadora.resultadoCuota[2];
        this.centralesRiesgo.plazo = 6;
        break;

      case 84:
        this.needleValue = 87;
        this.informacionPagar = this.calculadoraServicio.resultadoCalculadora.resultadoCuota[3];
        this.centralesRiesgo.plazo = 7;
        break;

      default:
        break;
    }
  }
  
  cambioResultadoCalculadora() {
    this.calculadoraServicio.observablResultadoCalculadora.subscribe(() => {
      this.validadPlazos();
      this.cambioVelocimetro(this.periodo.value);
    });
  }

}

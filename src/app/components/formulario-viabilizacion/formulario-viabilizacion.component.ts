import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiMercadolibreService } from 'src/app/services/api-mercadolibre.service';
import { constantes } from 'src/constants/constantes';
import { ApiCalculadoraService } from 'src/app/services/api-calculadora.service';
import { ContactoViable } from 'src/app/interfaces/contacto-viable';
import { CentralesRiesgoService } from 'src/app/services/centrales-riesgo.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ScanparamsService } from 'src/app/services/scanparams.service';


@Component({
  selector: 'app-formulario-viabilizacion',
  templateUrl: './formulario-viabilizacion.component.html',
  styleUrls: ['./formulario-viabilizacion.component.scss'],
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

export class FormularioViabilizacionComponent implements OnInit {
  isLinear = false;
  editable = true;
  primero: FormGroup;
  segundo: FormGroup;
  idResultado: number;
  pago: number;
  isNoValidMonto: boolean;//Nuevo
  isNoValidCuotaInicial: boolean;
  maxLengthHolderCuotaInicial: number;//Nuevo
  isSpeed: boolean;

  infoVehiculo: any;
  const = constantes;
  valorFinanciar: number;
  cuotaInicial: number;
  modeloVehiculo: any;
  porcentaje: number;
  valorCuota: number;

  cargando: boolean = false;
  desaparecerDetallesMobile: boolean = false;
  resultadoCalculadora: any = {};

  contacto: ContactoViable = {
    DatosBasicos: {
      TipoDocumento: null,
      NumeroDocumento: null,
      Nombre1: null,
      Celular: null,
      CorreoPersonal: null,
      ValorVehiculo: null,
      CuotaInicial: null,
      Plazo: null
    },
    DatosFinancieros: {
      ActividadEconomica: null,
      ActividadIndependiente: 3,
      IngresoMensual: null
    },
    OtrosDatos: {
      AutorizaConsultaCentrales: false,
      AutorizaMareigua: true,
      ValorFinanciar: null,
      ConcesionarioRadicacion: 0,
      IdentificacionVendedor: 0,
      InfoUno: null,
      InfoTres: null
    },
    DatosVehiculo: {
      Modelo: null,
      TipoVehiculo: 2
    }
  };

  constructor(public formBuilder: FormBuilder,
    public apiMercadolibre: ApiMercadolibreService,
    public calculadoraServicio: ApiCalculadoraService,
    public centralesRiesgo: CentralesRiesgoService,
    public breakpointObserver: BreakpointObserver,
    public scanParams: ScanparamsService) {
    // this.crearFormularios();

    setTimeout(() => {
      if (this.apiMercadolibre.idVehiculo !== undefined || this.apiMercadolibre.idVehiculo !== null) {
        this.obtenerInfoVehiculo();

      }
    }, 200);
    breakpointObserver.observe([
      '(max-width: 576px)'
    ]).subscribe(result => {
      if (result.matches) {
        this.desaparecerDetallesMobile = true;
      }
    });

  }

  ngOnInit() {
    this.viabilizar();
  }

  crearFormularios() {
    this.primero = this.formBuilder.group({
      cuotaInicial: [null, [Validators.required, Validators.min(this.cuotaInicial), Validators.max(this.valorFinanciar)]],
      cuotas: [48, Validators.required]
    });

    this.primero.controls['cuotaInicial'].valueChanges.subscribe(value => {
      this.contacto.DatosBasicos.CuotaInicial = value;
      this.valorFinanciar = this.infoVehiculo.price;
      this.porcentaje = this.calculadoraServicio.calcularPorcentajeCuotaInicial(value, this.cuotaInicial, this.infoVehiculo.price);
      this.resultadoCalculadora = this.calculadoraServicio.calcularCuota(this.const.cuotas, this.valorFinanciar - value, this.porcentaje);
      this.contacto.OtrosDatos.ValorFinanciar = this.valorFinanciar - value;
    });

    this.segundo = this.formBuilder.group({
      Nombre: ['', [Validators.required, Validators.minLength(5)]],
      TipoDocumento: [null, Validators.required],
      NumeroDocumento: ['', [Validators.required, Validators.minLength(5)]],
      Celular: ['', [Validators.required, Validators.pattern(this.const.patternCel), Validators.maxLength(10), Validators.minLength(10)]],
      CorreoPersonal: ['', [Validators.required, Validators.pattern(this.const.patternMail), Validators.minLength(10)]],
      ActividadEconomica: [null, Validators.required],
      IngresoMensual: ['', [Validators.required, Validators.min(this.const.valorMinIngreso)]],
      AutorizaConsultaCentrales: [false, Validators.required]
    });

    this.segundo.controls['Nombre'].valueChanges.subscribe(value => this.contacto.DatosBasicos.Nombre1 = value);
    this.segundo.controls['TipoDocumento'].valueChanges.subscribe(value => this.contacto.DatosBasicos.TipoDocumento = value);
    this.segundo.controls['NumeroDocumento'].valueChanges.subscribe(value => this.contacto.DatosBasicos.NumeroDocumento = value);
    this.segundo.controls['Celular'].valueChanges.subscribe(value => this.contacto.DatosBasicos.Celular = value);
    this.segundo.controls['CorreoPersonal'].valueChanges.subscribe(value => this.contacto.DatosBasicos.CorreoPersonal = value);
    this.segundo.controls['ActividadEconomica'].valueChanges.subscribe(value => this.contacto.DatosFinancieros.ActividadEconomica = value);
    this.segundo.controls['IngresoMensual'].valueChanges.subscribe(value => this.contacto.DatosFinancieros.IngresoMensual = value);
    this.segundo.controls['AutorizaConsultaCentrales'].valueChanges.subscribe(value => this.contacto.OtrosDatos.AutorizaConsultaCentrales = value);

    this.segundo.controls['TipoDocumento'].setValue(1);
  }

  cuotaInicialChange(value) {//Joan
    this.isNoValidMonto = false;
    this.isNoValidCuotaInicial = false;
    if (value > this.valorFinanciar) {
      this.isNoValidMonto = true;
    }
    if (value < this.cuotaInicial) {
      this.isNoValidCuotaInicial = true;
    }
  }

  get nombreNovalido() {
    return this.segundo.get('Nombre').invalid && this.segundo.get('Nombre').touched;
  }
  get tipoIdNoValido() {
    return this.segundo.get('TipoDocumento').invalid && this.segundo.get('TipoDocumento').touched;
  }
  get idNoValido() {
    return this.segundo.get('NumeroDocumento').invalid && this.segundo.get('NumeroDocumento').touched;
  }

  get documentoExtranjeria() {
    return this.segundo.controls['TipoDocumento'].value == 1 && this.segundo.controls['NumeroDocumento'].value.length == 6 && this.segundo.get('NumeroDocumento').touched;
  }

  get celularNoValido() {
    return this.segundo.get('Celular').invalid && this.segundo.get('Celular').touched;
  }
  get correoNoValido() {
    return this.segundo.get('CorreoPersonal').invalid && this.segundo.get('CorreoPersonal').touched;
  }
  get actividadEconomicaNoValido() {
    return this.segundo.get('ActividadEconomica').invalid && this.segundo.get('ActividadEconomica').touched;
  }
  get ingresoMensualNoValido() {
    return this.segundo.get('IngresoMensual') && this.segundo.get('IngresoMensual').touched;
  }

  obtenerInfoVehiculo() {
    this.apiMercadolibre.getInfoVehiculo(this.apiMercadolibre.idVehiculo)
      .subscribe((infoVehiculo) => {
        this.infoVehiculo = infoVehiculo;
        this.crearFormularios();
        this.valorFinanciar = this.infoVehiculo.price;
        this.modeloVehiculo = this.obtenerModelo();
        this.cuotaInicial = this.calculadoraServicio.cuotaInicial(this.infoVehiculo.price, this.modeloVehiculo.value_name);
        this.primero.controls.cuotaInicial.setValue(this.cuotaInicial);
        this.valorFinanciar -= this.cuotaInicial;
        this.contacto.OtrosDatos.ValorFinanciar = this.valorFinanciar;
        this.maxLengthHolderCuotaInicial = this.valorFinanciar.toString().length + 4;
        this.isSpeed = true;
      });
  }

  obtenerModelo() {
    const objeto = this.infoVehiculo.attributes.find((item: any) => item.name === 'Año');

    return objeto;
  }

  clickRadioCuota() {
    this.pago = this.primero.value.cuotas;
  }

  patternCoincide(event, value) {
    const pattern = new RegExp(value);
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  autenticar() {
    if (this.scanParams.utm) {
      this.contacto.OtrosDatos.InfoUno = this.scanParams.utm;
    }
    if (this.scanParams.idc) {
      this.contacto.OtrosDatos.ConcesionarioRadicacion = this.scanParams.idc;
    }
    if (this.scanParams.idv) {
      this.contacto.OtrosDatos.IdentificacionVendedor = this.scanParams.idv;
    }
    this.centralesRiesgo.cargador = true;
    if (this.desaparecerDetallesMobile) {
      this.apiMercadolibre.desaparecerDetallesMobile = true;
    }
    if (this.scanParams.enriquecido) {
      this.scanParams.enriquecido = true;
    } else {
      this.scanParams.enriquecido = false;
    }
    this.centralesRiesgo.autenticando();
  }

  viabilizar() {

    this.centralesRiesgo.observableAutenticar.subscribe((value: number) => {
      /* Igualando */
      this.contacto.DatosBasicos.ValorVehiculo = this.valorFinanciar;
      this.contacto.DatosVehiculo.Modelo = Number(this.centralesRiesgo.modeloCarro);
      this.contacto.DatosBasicos.Plazo = Number(this.centralesRiesgo.plazo);
      this.contacto.OtrosDatos.InfoTres = this.centralesRiesgo.urlVehiculo;
      /*  */

      if (value === 1) {
        this.editable = false;
        if (this.contacto.DatosFinancieros.ActividadEconomica) {
          if (this.contacto.DatosFinancieros.ActividadEconomica === 1) {
            this.contacto.DatosFinancieros.ActividadEconomica = 1;
            this.contacto.DatosFinancieros.ActividadIndependiente = 15;
          }
          if (this.contacto.DatosFinancieros.ActividadEconomica === 11) {
            this.contacto.DatosFinancieros.ActividadEconomica = 1;
            this.contacto.DatosFinancieros.ActividadIndependiente = 16;
          }
          if (this.contacto.DatosFinancieros.ActividadEconomica === 2) {
            this.contacto.DatosFinancieros.ActividadEconomica = 2;
            this.contacto.DatosFinancieros.ActividadIndependiente = 3;
          }
        }

        this.centralesRiesgo.apiModular(this.contacto).subscribe((res: any) => {
          this.centralesRiesgo.respuestaId = res.IdResultado;
          let respuesta = res.Resultado;
         this.cleanRespuesta(respuesta);
          this.centralesRiesgo.cargador = false;
        });
      }

    });
  }

  cleanRespuesta(respuesta) {
    let r = respuesta.toLowerCase();
    r = r.replace(new RegExp("\\s", 'g'), "");
    r = r.replace(new RegExp("[àáâãäå]", 'g'), "a");
    r = r.replace(new RegExp("æ", 'g'), "ae");
    r = r.replace(new RegExp("ç", 'g'), "c");
    r = r.replace(new RegExp("[èéêë]", 'g'), "e");
    r = r.replace(new RegExp("[ìíîï]", 'g'), "i");
    r = r.replace(new RegExp("ñ", 'g'), "n");
    r = r.replace(new RegExp("[òóôõö]", 'g'), "o");
    r = r.replace(new RegExp("œ", 'g'), "oe");
    r = r.replace(new RegExp("[ùúûü]", 'g'), "u");
    r = r.replace(new RegExp("[ýÿ]", 'g'), "y");
    r = r.replace(new RegExp("\\W", 'g'), "");
    this.centralesRiesgo.respuesta = r;

    if (r.length > 12 && this.centralesRiesgo.respuestaId == 2) {
      if (r == 'preaprobadonosevalidoingresopormareiguanosevalidoingresoporincomeestimatorpreaprobadoporvalidacionreglasmotorcapacidaddepagoyobanconoaplicaparafasttrack') {
        this.centralesRiesgo.variantePreaprobado = 21;
        this.centralesRiesgo.sendMail = true;
      }
      if (r == 'preaprobadonosevalidoingresopormareiguanosevalidoingresoporincomeestimatorreglasmotorycapacidaddepagovalidoperopreaprobadoportipodeingreso') {
        this.centralesRiesgo.variantePreaprobado = 22;
        if (this.scanParams.enriquecido){
        }else{
          this.centralesRiesgo.sendWhatsapp  = true;
        }
      }
      if (r == 'preaprobadopreaprobadoporvalidacionreglasmotorcapacidaddepagoyobanconoaplicaparafasttrack') {
        this.centralesRiesgo.variantePreaprobado = 23;
        if (this.scanParams.enriquecido) {
          this.centralesRiesgo.sendWhatsapp = true;
        }
      }
      if (r == 'preaprobadosevalidoenmareiguaperonocumpleconcontinuidadlaboralpreaprobadoporvalidacionreglasmotorcapacidaddepagoyobanconoaplicaparafasttrack') {
        this.centralesRiesgo.variantePreaprobado = 24;
          this.centralesRiesgo.sendMail = true;
      }
      if (r == 'preaprobadosevalidoenmareiguaperonocumpleconcontinuidadlaboralreglasmotorycapacidaddepagovalidoperopreaprobadoportipodeingreso') {
        this.centralesRiesgo.variantePreaprobado = 25;
        this.centralesRiesgo.sendMail = true;
      }
      if (r == 'preaprobadonosevalidocorreoelectroniconicelularporubica') {
        this.centralesRiesgo.variantePreaprobado = 26;
        if (this.scanParams.enriquecido) {
          this.centralesRiesgo.sendMail = true;
        }else{
          this.centralesRiesgo.sendWhatsapp = true;
        }
      }
      if (r == 'preaprobadonosevalidoingresoporincomeestimatorpreaprobadoporvalidacionreglasmotorcapacidaddepagoyobanconoaplicaparafasttrack'){
        this.centralesRiesgo.variantePreaprobado = 27;
          this.centralesRiesgo.sendMail = true;
      }
      if (r =='preaprobadonosevalidoingresoporincomeestimatorreglasmotorycapacidaddepagovalidoperopreaprobadoportipodeingreso '){
        this.centralesRiesgo.variantePreaprobado = 28;
          this.centralesRiesgo.sendWhatsapp = true;
      }
    } else {
      this.centralesRiesgo.variantePreaprobado = 2;
    }

    if ( this.centralesRiesgo.respuestaId == 3) {
      this.centralesRiesgo.sendWhatsapp = true;
    }

  }
}

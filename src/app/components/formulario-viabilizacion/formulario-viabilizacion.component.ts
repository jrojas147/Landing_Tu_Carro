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
import { MatDialog } from '@angular/material';
import { ModalComponent } from '../shared/modal/modal.component';
import { ModalinfoComponent } from '../shared/modal-Info/modalinfo.component';


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
  isNoValidMonto: boolean;
  isNoValidCuotaInicial: boolean;
  maxLengthHolderCuotaInicial: number;
  isSpeed: boolean;
  showInfo: boolean;
  sendMail: boolean;//
  sendWhatsapp: boolean;//
  letraMensaje: string;
  VarianteAprobado: string;
  TituloModRespuesta: string;
  MensajeModRespuesta: string;
  ejecutarFormularioPreaprobado: boolean = false;
  respuesta: string = '';


  infoVehiculo: any;
  const = constantes;
  valorFinanciar: number;
  cuotaInicial: number;
  modeloVehiculo: any;
  porcentaje: number;
  valorCuota: number;

  cargando: boolean = false;
  desaparecerDetallesMobile: boolean = false;
  resultadoCalculadora: any = {}

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
    public scanParams: ScanparamsService,
    private dialog: MatDialog,) {
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

  cuotaInicialChange(value) {
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
        this.showInfo = true;
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
              //test
                res.ResultadoLetra = 'C';
          this.centralesRiesgo.respuestaLetra =res.ResultadoLetra;
          this.respuesta = res.Resultado;
          this.letraMensaje = res.ResultadoLetra;
          this.centralesRiesgo.cargador = false;
          this.AccionMensaje(this.letraMensaje);
        });
      }
    });
  }

  AccionMensaje(letraMensaje){
    if (letraMensaje === 'A') {
      if (this.scanParams.enriquecido == true){
        this.centralesRiesgo.sendWhatsapp = true;
        this.validarTituloModalRespuesta();
        this.procesarModalRespuesta();
      }
    }
    if (letraMensaje === 'B') {
      if (this.scanParams.enriquecido == true ){
        this.centralesRiesgo.sendWhatsapp = true;
        this.validarTituloModalRespuesta();
        this.procesarModalRespuesta();
      }
    }
    if (letraMensaje === 'C' ) {
      if( this.scanParams.enriquecido == true){
        this.centralesRiesgo.sendMail = true;
        this.sendMail = true;
         this.validarTituloModalRespuesta();
         this.procesarModalRespuesta();

      }
    }
  }

  validarTituloModalRespuesta():void{
    if ( this.centralesRiesgo.sendMail){
      this.TituloModRespuesta = 'Credito Pre-Aprobado';
      this.MensajeModRespuesta = 'Estas a punto de cumplir tus sueños, para finalizar solo tienes que diligenciar el siguiente formato. Te estaremos contactando pronto';
    }
    if ( this.centralesRiesgo.sendWhatsapp){
      this.TituloModRespuesta = 'Credito Aprobado';
      this.MensajeModRespuesta = 'Estas a punto de cumplir tus sueños, te estamos contactando con nuestro asesor mediante WhatsApp';
    }
  }

  procesarModalRespuesta(): void{
    const dialogRef =this.dialog.open(ModalComponent, {
      data: {
      datacentrales : this.contacto,
      Titulo: this.TituloModRespuesta,
      Mensaje: this.MensajeModRespuesta,
      tipoModal: 'Generico',
      sentEmail: this.sendMail,
      sendWhatsapp: this.sendWhatsapp,
      ejecutarFormularioPreaprobado: this.ejecutarFormularioPreaprobado,
      },
      disableClose : true,
      height: '300px',
      width: '450px',
    });
    dialogRef.afterClosed().subscribe(result  =>{
      console.log(`Ejecutar formulario preaprobado ${result}`)
      if(result === true){
        this.procesarModalPreaprobado();
      }
    })
  }

  procesarModalPreaprobado(){
    const dialogRef =this.dialog.open(ModalComponent, {
      data: {
        datacentrales : this.contacto,
        Titulo: 'Formulario Pre-Aprobado',
        Mensaje: "Falta poco, Ingresa tus datos para finalizar",
        tipoModal: 'FormularioPreAprobado',
      },
    //  disableClose : true,
      height: '700px',
      width: '680px',

    });
    dialogRef.disableClose = true,
    dialogRef.afterClosed().subscribe(result  =>{
      console.log(result);
    })
  }

}

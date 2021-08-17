import { Component, OnInit } from '@angular/core';
import { constantes } from 'src/constants/constantes';
import { FormularioViabilizacionComponent } from 'src/app/components/formulario-viabilizacion/formulario-viabilizacion.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ApiMercadolibreService } from 'src/app/services/api-mercadolibre.service';
import { CentralesRiesgoService } from 'src/app/services/centrales-riesgo.service';
import { ScanparamsService } from 'src/app/services/scanparams.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../shared/modal/modal.component';



@Component({
  selector: 'app-respuesta',
  templateUrl: './respuesta.component.html',
  styleUrls: ['./respuesta.component.scss'],
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
export class RespuestaComponent implements OnInit {
  letraR: string;
  const = constantes;
  sentmail: boolean;
  sentWap: boolean;
  letrica

  TituloModRespuesta
  MensajeModRespuesta
  sendMail
  sendWhatsapp

  letraMensaje: string = '';
  varianteAprobado: string = '';


  contactoTemporal : any;

  constructor(
    public formularioViable: FormularioViabilizacionComponent,
    public apiMercadolibre: ApiMercadolibreService,
    public centralesRiesgo: CentralesRiesgoService,
    public scanParams: ScanparamsService,
    private dialog: MatDialog
    ) {
      console.log("El formualrio es " + formularioViable)
  }

  ngOnInit() {
  }


  validarLetra(){
    debugger;
    this.letrica = this.formularioViable.letraMensaje;
    console.log(`la letra es ${this.letrica}`)
  }

  ConectarWhatsapp() {
    window.open("https://cariai.com/santanderdigitalchannel/santanderdigitalchannel");
  }

  procesarModalPreaprobado(){
    const dialogRef =this.dialog.open(ModalComponent, {
      data: {
       datacentrales: this.formularioViable.contacto,
        Titulo: 'Formulario Pre-Aprobado',
        Mensaje: "Falta poco, Ingresa tus datos para finalizar",
        tipoModal: 'FormularioPreAprobado',
      },
      disableClose : true,
      height: '700px',
      width: '680px',

    });
    dialogRef.disableClose = true,
    dialogRef.afterClosed().subscribe(result  =>{
      console.log(result);
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { constantes } from 'src/constants/constantes';
import { FormularioViabilizacionComponent } from 'src/app/components/formulario-viabilizacion/formulario-viabilizacion.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ApiMercadolibreService } from 'src/app/services/api-mercadolibre.service';
import { CentralesRiesgoService } from 'src/app/services/centrales-riesgo.service';
import { ScanparamsService } from 'src/app/services/scanparams.service';
import { MatDialog } from '@angular/material';
import { ModalComponent } from '../../shared/modal/modal.component';
//import { ModalpreAprobadoComponent } from '../../shared/modalpre-aprobado/modalpre-aprobado.component';
//import { ModalRespuestaComponent } from '../../shared/modal-respuesta/modal-respuesta.component';

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

  TituloModRespuesta
  MensajeModRespuesta
  sendMail
  sendWhatsapp

  letraMensaje: string = '';
  varianteAprobado: string = '';

  constructor(
    private dialog: MatDialog,
    public formularioViable: FormularioViabilizacionComponent,
    public apiMercadolibre: ApiMercadolibreService,
    public centralesRiesgo: CentralesRiesgoService,
    public scanParams: ScanparamsService
    ) {
      console.log(formularioViable)
  }

  ngOnInit() {
    this.sendMail = this.centralesRiesgo.sendMail;
    this.sentWap = this.centralesRiesgo.sendWhatsapp;
    this.ObtenrLetra();//
    this.captarwhps();//
   // this.accionLetra()
  }

  ConectarWhatsapp() {
    window.open("https://cariai.com/santanderdigitalchannel/santanderdigitalchannel");
  }



  captarwhps(){
    this.sentmail = this.formularioViable.sendMail,
    this.sentWap = this.formularioViable.sendWhatsapp
  }

  // procesarModal() {
  //   const dialogRef = this.dialog.open(ModalpreAprobadoComponent, {
  //     data: this.centralesRiesgo
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     // console.log('Dialog result: ${result}');
  //    })
  // }

  ObtenrLetra(){
    const letraR = this.formularioViable.AccionMensaje;
  }

   procesarRespuesta(){
    const dialogRef =this.dialog.open(ModalComponent, {
      data: {
      datacentrales : this.centralesRiesgo,
      Titulo: this.TituloModRespuesta,
      Mensaje: this.MensajeModRespuesta,
      sentEmail: this.sendMail,
      sendWhatsapp: this.sendWhatsapp,
      tipoModal: 'Generico',
     // ejecutarFormularioPreaprobado: this.ejecutarFormularioPreaprobado
      },
      disableClose : true,
      height: '270px',
      width: '450px',
    });
    dialogRef.afterClosed().subscribe(result  =>{
      console.log(`Ejecutar formulario preaprobado ${result}`)
      if(result === true){
      //  this.procesarModalPreaprobado();
      }
    })
   }


}

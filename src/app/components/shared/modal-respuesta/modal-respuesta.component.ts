import { FormularioViabilizacionComponent } from './../../formulario-viabilizacion/formulario-viabilizacion.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CentralesRiesgoService } from 'src/app/services/centrales-riesgo.service';
import { ModalpreAprobadoComponent } from '../modalpre-aprobado/modalpre-aprobado.component';
import { constantes } from './../../../../constants/constantes'

@Component({
  selector: 'app-modal-respuesta',
  templateUrl: './modal-respuesta.component.html',
  styleUrls: ['./modal-respuesta.component.scss']
})
export class ModalRespuestaComponent implements OnInit {
  const = constantes;

  MensajeTitulo:string = 'Estas a punto de cumplir tus sueños';
  MensajeChat:string = 'Te estamos contactando con nuestro asesor mediante whatsapp';
  MensajeEmail:string = 'Para finalizar solo tienes que diligenciar el siguiente formato. Te estaremos contactando pronto';

  mensaje: string;


  constructor(
    @Inject(MAT_DIALOG_DATA) public centralesData: any,
    private dialog: MatDialog,
    public consultaCentrales: CentralesRiesgoService,
    public dialogRef: MatDialogRef<ModalRespuestaComponent>,
    // public formViabilizacion: FormularioViabilizacionComponent

  ) { }

  ngOnInit() {
    if (this.centralesData.sendMail) {
      this.mensaje = 'dsfsdfsd'
    } else {

    }


    this.directWhatsapp();
  }
  procesarModal() {
    this.cerrar();
    // const dialogRef = this.dialog.open(ModalpreAprobadoComponent, {
    //   data: this.formViabilizacion.contacto//Validar que carga
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //  // console.log('Dialog result: ${result}');
    // })
  }


  ConectarWhatsapp() {
    window.open("https://cariai.com/santanderdigitalchannel/santanderdigitalchannel");
  }

  directWhatsapp():void{
     if (this.centralesData.sendWhatsapp == true){
    //   setTimeout( () => {
    //     this.ConectarWhatsapp();
    //   },5000)
     }
  }

  cerrar() {
    this.dialogRef.close();
  }

}

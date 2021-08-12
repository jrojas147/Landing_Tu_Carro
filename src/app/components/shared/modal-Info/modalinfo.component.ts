import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-modalinfo',
  templateUrl: './modalinfo.component.html',
  styleUrls: ['./modalinfo.component.scss']
})
export class ModalinfoComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ModalinfoComponent>,
    @Inject(MAT_DIALOG_DATA) public dataInfo: {
      titulo: string,
      mensaje: string,
      mensaje2: string,
      tipoModalSalir: boolean,
      tipoModalDocumentos: boolean
     },
  ) { }

  ngOnInit() {
    //this.tipoModal = this.dataInfo.tipoModal;
  }


  salirViabilizacion(): void{
    this.dialogRef.close(true);
  }

  Mantener(){
    this.dialogRef.close();
  }





}

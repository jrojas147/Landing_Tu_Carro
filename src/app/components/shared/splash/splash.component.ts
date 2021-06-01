import { Component, OnInit } from '@angular/core';
import { constantes } from 'src/constants/constantes';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent {

  const = constantes;
  constructor() {
   }

}

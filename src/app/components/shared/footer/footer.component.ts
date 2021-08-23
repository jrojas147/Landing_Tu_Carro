import { Component, OnInit } from '@angular/core';
import { constantes } from 'src/constants/constantes';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  const = constantes;

  constructor() { }

  ngOnInit() {
  }

}

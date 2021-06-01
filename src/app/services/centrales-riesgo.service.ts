import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { constantes } from 'src/constants/constantes';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})
export class CentralesRiesgoService {

  token: any;
  env = environment;
  const = constantes;
  cargador = false;
  respuestaId: number;
  respuesta: string;
  variantePreaprobado: number;
  sendMail = false;
  sendWhatsapp = false;
  modeloCarro;
  plazo: number;
  urlVehiculo :string;

  public observableAutenticar: any;
  public autenticar: any = 0;

  headers = new HttpHeaders ({
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': 'application/json, application/xml, text/plain, text/html, *.*'
  });

  headerVi;
  optionsVi;
  options = { headers: this.headers };


  constructor(public http: HttpClient) {
    this.observableAutenticar = new BehaviorSubject<number>(this.autenticar);
  }

  autenticando() {

    const bodyT = {
      UserPass: this.const.userpass,
    };

    const body = new HttpParams({fromObject: bodyT});

    return this.http.post(`${this.env.urlA}`, body, this.options)
    .subscribe((resp: any) => {
           this.token = resp.Token;
           this.autenticar = resp.Status;

           this.headerVi = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.token
           };

           this.optionsVi = { headers: this.headerVi };
           this.observableAutenticar.next(this.autenticar);
      });
  }

  apiModular(contacto: any) {
    contacto = JSON.stringify(contacto);
    return this.http.post(`${constantes.apiModular}`, contacto, this.optionsVi);
  }

}

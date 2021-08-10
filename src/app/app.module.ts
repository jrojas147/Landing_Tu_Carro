import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { ViabilizaVehiculoComponent } from './components/vistas/viabiliza-vehiculo/viabiliza-vehiculo.component';
import { HttpClientModule } from '@angular/common/http';
import { EncabezadoComponent } from './components/shared/encabezado/encabezado.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { DetallesVehiculoComponent } from './components/detalles-vehiculo/detalles-vehiculo.component';
import { FormularioViabilizacionComponent } from './components/formulario-viabilizacion/formulario-viabilizacion.component';
import { MaterialModule } from 'src/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { PrimeraPalabraPipe } from './pipes/primera-palabra.pipe';
import { CargadorComponent } from './components/shared/cargador/cargador.component';
import { SplashComponent } from './components/shared/splash/splash.component';
import { ModaltycComponent } from './components/shared/modaltyc/modaltyc.component';

import { MensajeErrorComponent } from './components/shared/mensaje-error/mensaje-error.component';
import { SpeedometerComponent } from './components/formulario-viabilizacion/speedometer/speedometer.component';
import { NoFinanciableComponent } from './components/shared/no-financiable/no-financiable.component';
import { GaugeChartModule } from 'angular-gauge-chart';
import { UrlSeguraPipe } from './pipes/url-segura.pipe';
import { RouterModule } from '@angular/router';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { ModalpreaprobadoModule } from './components/shared/modalpre-aprobado/modalpre-aprobado.module';
import { ModalRespuestaComponent } from './components/shared/modal-respuesta/modal-respuesta.component';
import { ModalRespuestaModule } from './components/shared/modal-respuesta/modal-respuesta.module';
import { RespuestaComponent } from './components/formulario-viabilizacion/respuesta/respuesta.component';
import { ModalComponent } from './components/shared/modal/modal.component';
import { ModalModule } from './components/shared/modal/modal.module';


registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    ViabilizaVehiculoComponent,
    EncabezadoComponent,
    FooterComponent,
    DetallesVehiculoComponent,
    FormularioViabilizacionComponent,
    PrimeraPalabraPipe,
    CargadorComponent,
    SplashComponent,
    ModaltycComponent,
    RespuestaComponent,
    MensajeErrorComponent,
    SpeedometerComponent,
    UrlSeguraPipe,
    NoFinanciableComponent,
   // ModalComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    GaugeChartModule,
    ModalModule,

    ModalpreaprobadoModule,
    ModalRespuestaModule,
    RouterModule.forRoot([])
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
import { MatIconModule } from '@angular/material';
import { CargadorComponent } from './components/shared/cargador/cargador.component';
import { SplashComponent } from './components/shared/splash/splash.component';
import { ModaltycComponent } from './components/shared/modaltyc/modaltyc.component';
import { RespuestaComponent } from './components/formulario-viabilizacion/respuesta/respuesta.component';
import { MensajeErrorComponent } from './components/shared/mensaje-error/mensaje-error.component';
import { SpeedometerComponent } from './components/formulario-viabilizacion/speedometer/speedometer.component';
import { GaugeChartModule } from 'angular-gauge-chart';
import { UrlSeguraPipe } from './pipes/url-segura.pipe';
import { RouterModule } from '@angular/router';
import { NoFinanciableComponent } from './components/shared/no-financiable/no-financiable.component';

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
    NoFinanciableComponent,
    RespuestaComponent,
    MensajeErrorComponent,
    SpeedometerComponent,
    UrlSeguraPipe
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
    RouterModule.forRoot([])
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { DatosBasicos } from './datos-basicos';
import { DatosFinancieros } from './datos-financieros';
import { DatosVehiculo } from './datosVehiculo';
import { OtrosDatos } from './otros-datos';

export interface ContactoViable {

    DatosBasicos:DatosBasicos;
    DatosFinancieros:DatosFinancieros;
    OtrosDatos:OtrosDatos;
    DatosVehiculo:DatosVehiculo;

}

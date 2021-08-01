import { DatosPreAprobado } from './datosPreAprobado';
import { DatosBasicos } from './datos-basicos';
import { DatosFinancieros } from './datos-financieros';

export interface ContactoFormularioPreAprobado {
  DatosBasicos : DatosBasicos;
  DatosFinancieros : DatosFinancieros;
  DatosPreAprobado : DatosPreAprobado;
}

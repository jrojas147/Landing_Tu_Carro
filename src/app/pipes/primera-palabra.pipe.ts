import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'primeraPalabra'
})
export class PrimeraPalabraPipe implements PipeTransform {

  transform(value: string): any {
    return value.replace(/ .*/, '');
  }

}

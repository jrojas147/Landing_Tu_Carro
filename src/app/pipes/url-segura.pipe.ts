import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlSegura'
})
export class UrlSeguraPipe implements PipeTransform {

  transform(value: string): any {

    return value.slice(0, 4) + 's' + value.slice(4);
  }

}

import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'multiplicity'
})
export class MultiplicityPipe implements PipeTransform {

  transform(value: number): string {
    return value === 0 ? 'Четное' : 'Нечетное';
  }
}

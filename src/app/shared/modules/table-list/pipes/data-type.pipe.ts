import {Pipe, PipeTransform} from '@angular/core';
import {FilterType} from '../resources/table-list-options';

@Pipe({
  name: 'dataType'
})
export class DataTypePipe implements PipeTransform {

  constructor() {}

  transform(value: any, args?: any): any {
    switch (args) {
      case FilterType.date: {
        const d = new Date(value);
        return d.toLocaleDateString();
      }
      default: {
        return value;
      }
    }
  }
}

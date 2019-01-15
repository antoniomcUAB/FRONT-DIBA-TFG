import {Component, Input} from '@angular/core';
import {FilterType} from '../../resources/table-list-options';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {CustomInput} from '../../../../resources/custom-input';

const noop = () => {
};
@Component({
  selector: 'app-filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.scss'],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: FilterInputComponent, multi: true}]
})
export class FilterInputComponent extends CustomInput {
  FilterType = FilterType;
  @Input() type: FilterType;

  removeFilter() {
    this.value = null;
  }

}

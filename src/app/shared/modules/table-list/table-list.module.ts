import {NgModule} from '@angular/core';
import {TableListComponent} from './components/table-list/table-list.component';
import {FilterInputComponent} from './components/filter-input/filter-input.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ContextMenuModule} from 'ngx-contextmenu';
import {TranslateModule} from '@ngx-translate/core';
import {DataTypePipe} from './pipes/data-type.pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ContextMenuModule,
    NgbModule,
    TranslateModule
  ],
  declarations: [
    TableListComponent,
    FilterInputComponent,
    DataTypePipe
  ],
  exports: [
    TableListComponent
  ]
})
export class TableListModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchComponent} from './search/search.component';
import {RouterModule} from "@angular/router";


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
   SearchComponent
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchModule {
}

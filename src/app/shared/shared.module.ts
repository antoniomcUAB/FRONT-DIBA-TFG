import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { GlobalService } from './services/global.service';
import {
  MatCardModule,
  MatButtonModule,
  MatInputModule,
  MatSelectModule,
  MatFormFieldModule
} from '@angular/material';
import {TableListModule} from "./modules/table-list";
import {SearchModule} from './components/search.module';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    TableListModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    TranslateModule,
    LoadingBarRouterModule,
    NgbModule.forRoot(),
    MatSidenavModule,
    SearchModule,
    TextMaskModule
  ],
  providers: [
    GlobalService
  ],
  declarations: [
  ],
  exports: [
    CommonModule,
    FormsModule,
    LoadingBarRouterModule,
    MatSidenavModule,
    NgbModule,
    ReactiveFormsModule,
    TranslateModule,
    TableListModule,
    SearchModule,
    TextMaskModule
  ]
})
export class SharedModule { }

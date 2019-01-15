import { HttpClientModule } from '@angular/common/http';
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
    HttpClientModule,
    LoadingBarRouterModule,
    NgbModule.forRoot(),
    MatSidenavModule,
    SearchModule
  ],
  providers: [
    GlobalService
  ],
  declarations: [
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    LoadingBarRouterModule,
    MatSidenavModule,
    NgbModule,
    ReactiveFormsModule,
    TranslateModule,
    TableListModule,
    SearchModule
  ]
})
export class SharedModule { }

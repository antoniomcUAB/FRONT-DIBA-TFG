import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';

/* Components */
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HomeComponent } from './components/home.component';
import { FileDetailComponent } from "../files";
import {FilesDetailService} from "../files/services/file-detail.service";

@NgModule({
  imports: [
    SharedModule,
    NgxDatatableModule
  ],
  declarations: [
    HomeComponent,
    FileDetailComponent
  ],
  exports: [FileDetailComponent],
  providers:[FilesDetailService]
})
export class HomeModule { }

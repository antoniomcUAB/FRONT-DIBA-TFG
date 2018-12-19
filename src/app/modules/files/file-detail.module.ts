import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


/* Components */
import { FileDetailComponent } from "./components/file-detail/file-detail.component";
import {RouterModule} from '@angular/router';
import {FileDetailRoutes} from './file-detail.routing';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(FileDetailRoutes),
    NgxDatatableModule
  ],
  declarations: [
    FileDetailComponent,
  ],
  exports: []
})

export class FileDetailModule { }

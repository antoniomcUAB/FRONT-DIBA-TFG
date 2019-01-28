import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxChartsModule } from "@swimlane/ngx-charts";

/* Components */
import { FileDetailComponent } from "./components/file-detail/file-detail.component";
import { RouterModule } from '@angular/router';
import { FileDetailRoutes } from './file-detail.routing';
import { FilesDetailService } from './services/file-detail.service';



@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(FileDetailRoutes),
    NgxDatatableModule,
    NgxChartsModule
  ],
  declarations: [
    FileDetailComponent,
  ],
  providers: [FilesDetailService],
})

export class FileDetailModule { }

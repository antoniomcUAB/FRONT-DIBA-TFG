import { FileDetailRoutes } from "./file-detail.routing";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


/* Components */
import { FileDetailComponent } from "./components/file-detail/file-detail.component";
import { DiagnosisDetailComponent } from "../diagnosis/components/diagnosis-detail/diagnosis-detail.component";

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(FileDetailRoutes),
    NgxDatatableModule
  ],
  declarations: [
    FileDetailComponent,
    DiagnosisDetailComponent
  ],
  exports: [DiagnosisDetailComponent]
})

export class FileDetailModule { }

import { DiagnosisRoutes } from "./diagnosis.routing";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';

/* Components */
import { DiagnosisDetailComponent } from "../diagnosis/components/diagnosis-detail/diagnosis-detail.component";

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(DiagnosisRoutes)
  ],
  declarations: [
    DiagnosisDetailComponent
  ],
})

export class DiagnosisModule { }

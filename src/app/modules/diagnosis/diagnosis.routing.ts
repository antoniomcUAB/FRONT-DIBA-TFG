import { Routes } from '@angular/router';

import { DiagnosisDetailComponent } from "../diagnosis/components/diagnosis-detail/diagnosis-detail.component";

export const DiagnosisRoutes: Routes = [
  {
    path: '',
    component: DiagnosisDetailComponent,
    data: {
      heading: 'DiagnosisDetail'
    }
  }];

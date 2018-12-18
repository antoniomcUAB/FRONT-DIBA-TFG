import { Routes } from '@angular/router';

import { FileDetailComponent } from "./components/file-detail/file-detail.component";
import { DiagnosisDetailComponent } from "../diagnosis/components/diagnosis-detail/diagnosis-detail.component";

export const FileDetailRoutes: Routes = [
  {
    path: '',
    component: FileDetailComponent,
    data: {
      heading: 'FileDetail'
    }
  },
  { path: '/diagnosis-detail', component: DiagnosisDetailComponent },
  { path: '/diagnosis-detail/:id', component: DiagnosisDetailComponent }];

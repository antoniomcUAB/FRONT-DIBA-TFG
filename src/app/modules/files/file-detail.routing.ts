import {Routes} from '@angular/router';

import { FileDetailComponent } from "./components/file-detail/file-detail.component";

export const FileDetailRoutes: Routes = [
  {
    path: '',
    component: FileDetailComponent,
    data: {
      heading: 'FileDetail'
    }
  }
];

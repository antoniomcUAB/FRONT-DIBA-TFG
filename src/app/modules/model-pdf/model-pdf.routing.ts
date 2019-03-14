import {Routes} from '@angular/router';

import {ModelPDFComponent} from "./model-pdf/model-pdf.component";

export const ModelPDFRoutes: Routes = [
  {
    path: '',
    component: ModelPDFComponent,
    data: {
      heading: 'ModelPDF'
    }
  }
];

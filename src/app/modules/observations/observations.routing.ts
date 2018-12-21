import {Routes} from '@angular/router';

import { ObservationsComponent } from "./components/observations.component";

export const ObservationsRoutes: Routes = [
  {
    path: '',
    component: ObservationsComponent,
    data: {
      heading: 'Observation'
    }
  }
];

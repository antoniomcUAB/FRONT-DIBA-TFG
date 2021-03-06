import { Routes } from '@angular/router';

import { Error4Component } from './error4/error4.component';
import { Error5Component } from './error5/error5.component';

export const ErrorRoutes: Routes = [
  {
    path: '',
    children: [{
      path: '404',
      component: Error4Component
    }, {
      path: '500',
      component: Error5Component
    }]
  }
];

import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './core';
import { AuthLayoutComponent } from './core';

export const AppRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: './modules/home#HomeRoutingModule'
      },
      {
        path: 'file-detail',
        loadChildren: './modules/files#FileDetailModule'
      },
      {
        path: 'diagnosis-detail',
        loadChildren: './modules/files#FileDetailModule'
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'error',
        loadChildren: './error/error.module#ErrorModule'
      }
    ]
  }, {
    path: '**',
    redirectTo: 'error/404'
  }
];


import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './core';
import { AuthLayoutComponent } from './core';
import {AuthenticatedGuard} from "./modules/auth";
import {ErrorLoginPageComponent} from "./modules/auth/components/error-login-page/error-login-page.component";

export const AppRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthenticatedGuard],
    canActivateChild: [AuthenticatedGuard],
    children: [
      {
        path: 'home',
        loadChildren: './modules/home#HomeModule'
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
        path: 'observations',
        loadChildren: './modules/observations#ObservationsModule'
      }, {
        path: 'tabs',
        loadChildren: './modules/tabs#TabsModule'
      }, {
        path: 'model-pdf',
        loadChildren: './modules/model-pdf/model-pdf.module#ModelPDFModule'
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
      path: 'error',
      component: ErrorLoginPageComponent
    }]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: './modules/auth/auth.routing#AuthRoutingModule'
      },
      {
        path: 'error',
        loadChildren: './error/error.module#ErrorModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'error/404'
  }
];


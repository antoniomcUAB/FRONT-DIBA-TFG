import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {NgModule} from '@angular/core';
import {AuthModule} from './auth.module';
import {ErrorLoginPageComponent} from "./components/error-login-page/error-login-page.component";

const AuthRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'errorlogin',
    component: ErrorLoginPageComponent
  }
];

@NgModule({
  imports: [
    AuthModule,
    RouterModule.forChild(AuthRoutes)
  ]
})
export class AuthRoutingModule { }

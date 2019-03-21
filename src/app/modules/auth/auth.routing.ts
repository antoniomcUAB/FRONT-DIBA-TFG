import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {NgModule} from '@angular/core';
import {AuthModule} from './auth.module';

const AuthRoutes: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    AuthModule,
    RouterModule.forChild(AuthRoutes)
  ]
})
export class AuthRoutingModule { }

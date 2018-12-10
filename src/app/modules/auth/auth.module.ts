import { NgModule } from '@angular/core';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { LoginComponent } from './components/login/login.component';
import {SharedModule} from '../../shared';

@NgModule({
  imports: [
    SharedModule
  ],
  providers: [
    AuthService,
    TokenService
  ],
  declarations: [LoginComponent]
})
export class AuthModule { }

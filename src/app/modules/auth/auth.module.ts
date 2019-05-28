import { NgModule } from '@angular/core';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { LoginComponent } from './components/login/login.component';
import {SharedModule} from '../../shared';
import {AuthenticatedGuard} from "./services/authenticated.guard";

@NgModule({
  imports: [
    SharedModule
  ],
  providers: [
    AuthService,
    AuthenticatedGuard,
    TokenService
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class AuthModule {}

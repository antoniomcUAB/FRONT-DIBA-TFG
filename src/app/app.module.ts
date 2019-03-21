import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SharedModule} from './shared';
import {
  MenuComponent,
  HeaderComponent,
  SidebarComponent,
  FooterComponent,
  AdminLayoutComponent,
  AuthLayoutComponent,
  AccordionAnchorDirective,
  AccordionLinkDirective,
  AccordionDirective } from './core';
import {AuthModule, jwtOptionsFactory, TokenService} from './modules/auth';
import {RouterModule} from '@angular/router';
import {AppRoutes} from './app.routing';
import {TranslateLoaderFactory} from './app-translate';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {JwtModule, JWT_OPTIONS} from '@auth0/angular-jwt';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {HomeService} from "./modules/home/services/home.service";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
  ],
  imports: [
    AuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [TokenService]
      }
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateLoaderFactory
      }
    }),
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

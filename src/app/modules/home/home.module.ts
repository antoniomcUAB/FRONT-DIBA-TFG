import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home.component';
import {SharedModule} from '../../shared';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }

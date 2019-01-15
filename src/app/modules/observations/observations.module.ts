import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';


/* Components */
import { ObservationsComponent } from "./components/observations.component";
import {RouterModule} from '@angular/router';
import {ObservationsRoutes} from './observations.routing';



@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ObservationsRoutes),
  ],
  declarations: [
    ObservationsComponent
  ]
})

export class ObservationsModule { }

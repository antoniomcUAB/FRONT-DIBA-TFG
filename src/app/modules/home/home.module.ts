import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';

/* Components */
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HomeComponent } from './components/home.component';
import {RouterModule} from '@angular/router';
import {HomeRoutes} from './home.routing';
import {HomeService} from './services/home.service';

@NgModule({
  imports: [
    SharedModule,
    NgxDatatableModule,
    RouterModule.forChild(HomeRoutes)
  ],
  declarations: [
    HomeComponent
  ],
  providers: [HomeService]
})
export class HomeModule { }

import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';

/* Components */
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HomeComponent } from './components/home.component';
import {FilesDetailService} from "../files/services/file-detail.service";
import {RouterModule} from '@angular/router';
import {HomeRoutes} from './home.routing';

@NgModule({
  imports: [
    SharedModule,
    NgxDatatableModule,
    RouterModule.forChild(HomeRoutes)
  ],
  declarations: [
    HomeComponent
  ],
  providers: [FilesDetailService]
})
export class HomeModule { }

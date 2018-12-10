import {RouterModule, Routes} from '@angular/router';

import {NgModule} from '@angular/core';
import {HomeModule} from './home.module';
import {HomeComponent} from './components/home.component';

export const HomeRoutes: Routes = [{
  path: '',
  component: HomeComponent,
  data: {
    heading: 'Home'
  }
}];

@NgModule({
imports: [
  HomeModule,
  RouterModule.forChild(HomeRoutes)
]
})

export class HomeRoutingModule {}

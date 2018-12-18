import {RouterModule, Routes} from '@angular/router';

import {NgModule} from '@angular/core';
import {HomeModule} from './home.module';
import {HomeComponent} from './components/home.component';
import {FileDetailComponent} from "../files";

export const HomeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      heading: 'Home'
    }
  },
  { path: 'file-detail', component: FileDetailComponent },
  { path: 'file-detail:id', component: FileDetailComponent }
];

@NgModule({
imports: [
  HomeModule,
  RouterModule.forChild(HomeRoutes)
]
})

export class HomeRoutingModule {}

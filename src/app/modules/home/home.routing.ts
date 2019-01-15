import {HomeComponent} from './components/home.component';
import {Routes} from '@angular/router';

export const HomeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      heading: 'Home'
    }
  }
];

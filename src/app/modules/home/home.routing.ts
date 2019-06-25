import {HomeComponent} from './components/home.component';
import {Routes} from '@angular/router';

export const HomeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      id: 'Home'
    }
  },
  {
    path: 'something/:id',
    component: HomeComponent
  }
  ];

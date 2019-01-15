import {Routes} from '@angular/router';
import {TabsComponent} from './components/tabs/tabs.component';

export const TabsRoutes: Routes = [
  {
    path: '',
    component: TabsComponent,
    data: {
      heading: 'Tabs'
    }
  }
];

import { NgModule } from '@angular/core';
/* Components */
import {RouterModule} from '@angular/router';
import {AmbitAutonomiaTabComponent} from './components/ambit-autonomia-tab/ambit-autonomia-tab.component';

import {TabsComponent} from './components/tabs/tabs.component';
import {TabsRoutes} from './tabs.routing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CheckFormComponent } from './components/check-form/check-form.component';
import { AmbitMaterialTabComponent } from './components/ambit-material-tab/ambit-material-tab.component';
import {CommonModule} from '@angular/common';
import { AmbitRelacionalTabComponent } from './components/ambit-relacional-tab/ambit-relacional-tab.component';
import { GlobalitatTabComponent } from './components/globalitat-tab/globalitat-tab.component';
import { ValoracioDiagnosticTabComponent } from './components/valoracio-diagnostic-tab/valoracio-diagnostic-tab.component';


@NgModule({
  imports: [
    RouterModule.forChild(TabsRoutes),
    NgbModule,
    CommonModule
  ],
  declarations: [
    TabsComponent,
    AmbitAutonomiaTabComponent,
    CheckFormComponent,
    AmbitMaterialTabComponent,
    AmbitRelacionalTabComponent,
    GlobalitatTabComponent,
    ValoracioDiagnosticTabComponent
  ]
})

export class TabsModule { }

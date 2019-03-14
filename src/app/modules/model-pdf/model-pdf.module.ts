import { NgModule } from '@angular/core';
import { ModelPDFComponent } from './model-pdf/model-pdf.component';
import {RouterModule} from "@angular/router";
import {ModelPDFRoutes} from "./model-pdf.routing";
import {SharedModule} from "../../shared";
import {HomeService} from "../home/services/home.service";

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ModelPDFRoutes),
  ],
  declarations: [ModelPDFComponent],
  providers: [HomeService]
})
export class ModelPDFModule { }

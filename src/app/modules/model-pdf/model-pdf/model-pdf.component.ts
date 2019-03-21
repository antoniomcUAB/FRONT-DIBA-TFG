import { Component } from '@angular/core';
import { AmbitContext, Frecuencia, Gravedad, ModelQueryContext, ModelQuerySituation, SituacionSocial } from "../../files";
import { HomeService } from "../../home/services/home.service";

@Component({
  selector: 'app-model-pdf',
  templateUrl: './model-pdf.component.html',
  styleUrls: ['./model-pdf.component.scss']
})
export class ModelPDFComponent {

  model;
  tableContext: ModelQueryContext[] = [];
  tableSituation: ModelQuerySituation[] = [];

  constructor(private _service: HomeService) {
    /* Get Current Model */
    this.getModel();
  }

  /** GET MODEL **/
  getModel() {
    this._service.getModel().subscribe( (data) => {
      this.model = data;
      this.tableQueryContext();
      this.tableQuerySituation();
    }, error => {
      console.log("ERROR al recuperar el datos");
    });
  }

  tableQuerySituation() {
    for (const i in this.model.ambits) {
      this.tableSituation[i] = new ModelQuerySituation();
      this.tableSituation[i].ambits = this.model.ambits[i].descripcio;
      for (const entorns of this.model.ambits[i].entorns) {
        for (const j in entorns.preguntes) {
          this.tableSituation[i].situacionSocial[j] = new SituacionSocial();
          this.tableSituation[i].situacionSocial[j].descripcio = entorns.preguntes[j].social;
          this.tableSituation[i].situacionSocial[j].definicio = entorns.preguntes[j].definicio;
          for (const k in entorns.preguntes[j].selectors) {
            this.tableSituation[i].situacionSocial[j].gravetat[k] = new Gravedad();
            this.tableSituation[i].situacionSocial[j].gravetat[k].descripcio = entorns.preguntes[j].selectors[k].gravetat.descripcio;
            this.tableSituation[i].situacionSocial[j].gravetat[k].evidencia = entorns.preguntes[j].selectors[k].evidencia;
            for (const l in entorns.preguntes[j].selectors[k].frequencia) {
              this.tableSituation[i].situacionSocial[j].gravetat[k].frequencia[l] = new Frecuencia();
              this.tableSituation[i].situacionSocial[j].gravetat[k].frequencia[l].descripcio = entorns.preguntes[j].selectors[k].frequencia[l].frequencia.descripcio;
              this.tableSituation[i].situacionSocial[j].gravetat[k].frequencia[l].evidencia = entorns.preguntes[j].selectors[k].frequencia[l].evidencia;
              this.tableSituation[i].situacionSocial[j].gravetat[k].frequencia[l].risc = entorns.preguntes[j].selectors[k].frequencia[l].risc.descripcio;
            }
          }
        }
      }
    }
  }

  /* Contextualitation Table Query */
  tableQueryContext() {
    for (const i in this.model.ambits) {
      this.tableContext[i] = new ModelQueryContext();
      this.tableContext[i].ambits = this.model.ambits[i].descripcio;
      for (const j in this.model.ambits[i].factors_context) {
        this.tableContext[i].context[j] = new AmbitContext();
        this.tableContext[i].context[j].descripcio = this.model.ambits[i].factors_context[j].descripcio;
        this.tableContext[i].context[j].risc = this.model.ambits[i].factors_context[j].gravetat.descripcio;
      }
    }
  }

  onPrint() {
    window.print();
  }

}

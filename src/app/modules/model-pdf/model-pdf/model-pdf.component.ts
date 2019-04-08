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
    for (const ambit of this.model.ambits) {
      const amb = new ModelQuerySituation();
      amb.ambits = ambit.descripcio;
      this.tableSituation.push(amb);
      for (const entorns of ambit.entorns) {
        for (const pregunta of entorns.preguntes) {
          const pr = new SituacionSocial();
          pr.id = pregunta.id;
          pr.descripcio = pregunta.social;
          pr.definicio = pregunta.definicio;
         amb.situacionSocial.push(pr);
          for (const tors of pregunta.selectors) {
            const slec = new Gravedad();
            slec.descripcio = tors.gravetat.descripcio;
            slec.evidencia = tors.evidencia;
            pr.gravetat.push(slec);
            for (const f of tors.frequencia) {
              const freq = new Frecuencia();
              freq.descripcio = f.frequencia.descripcio;
              freq.evidencia = f.evidencia;
              freq.risc = f.risc.descripcio;
              slec.frequencia.push(freq);
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

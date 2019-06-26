import { Component } from '@angular/core';
import {
  AmbitContext,
  Frecuencia,
  Gravedad,
  ModelQueryContext,
  ModelQuerySituation,
  SituacionSocial,
  EntornsQuery,
  AmbitQuery
} from "../../files";
import { HomeService } from "../../home/services/home.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-model-pdf',
  templateUrl: './model-pdf.component.html',
  styleUrls: ['./model-pdf.component.scss']
})
export class ModelPDFComponent {

  model;
  tableContext: ModelQueryContext[] = [];
  tableSituation: ModelQuerySituation[] = [];
  public id: any;
  constructor(private _service: HomeService,
              private _route: ActivatedRoute) {
    /* Get Current Model */
    this.getModel();
    this.id = this._route.snapshot.params['id'];
  }
  scroll() {
    setTimeout(_ => {
      let f = document.getElementById(this.id);
      f.scrollIntoView();

    }, 500);
  }

  /** GET MODEL **/
  getModel() {
    this._service.getModel().subscribe( (data) => {
      this.model = data;
      this.tableQueryContext();
      this.tableQuerySituation();
      this.scroll();
    }, error => {
      console.log("ERROR al recuperar el datos");
    });
  }

  tableQuerySituation() {
    for (const ambit of this.model.ambits) {
      const amb = new ModelQuerySituation();
      amb.ambits = new AmbitQuery();
      amb.ambits.descripcio = ambit.descripcio;
      this.tableSituation.push(amb);
      for (const entorns in ambit.entorns) {
        const ent = new EntornsQuery();
        ent.descripcio = ambit.entorns[entorns].descripcio;
        amb.ambits.entorns.push(ent);
        for (const pregunta of ambit.entorns[entorns].preguntes) {
          const pr = new SituacionSocial();
          pr.id = pregunta.id;
          pr.descripcio = pregunta.social;
          pr.definicio = pregunta.definicio;
         amb.ambits.entorns[entorns].situacionSocial.push(pr);
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

import {Expedient, Valoracio} from "../../files";
import {FactorsContext} from "./tab-class-form";

export class Diagnostic {
  id: string;
  data: string;
  observaciones: string;
  expedient: Expedient;
  estat: Estat;
  versioModel: VersioModel;
  contextualizacion: Contextualizacion [];
  valoracio: Valoracio[];
}
export class Estat {
  id: number;
  descripcio: string;
}
export class VersioModel {
  id: number;
  versio: string;
  data: string;
  preguntaEconomica: number;
}
export class Contextualizacion {
  id: number;
  membreUnic: boolean;
  mesUC: any;
  factorsContext: FactorsContext;
  persona: any;

}

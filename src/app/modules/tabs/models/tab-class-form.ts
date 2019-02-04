export class Ambits {
  ambits: Ambit [];
}

export class Ambit {
  descripcio: string;
  id: string;
  entorns: Entorns [];
  factors_context: FactorsContext[];

}
export class AmbitContext {
  id: number;
  descripcio: string;
}
export class FactorsContext {
  descripcio: string;
  infants: boolean;
  gravetat: Gravetat;
  id: number;
  ambit: AmbitContext;
  apl: boolean;
}
export class Entorns {
  descripcio: string;
  id: number;
  preguntes: Pregunta [];
}
export class Pregunta {
  social: string;
  definicio: string;
  id: number;
  selectors: SelectorGravetat [];
  apl: boolean;
}
export class SelectorGravetat {
  id: number ;
  evidencia: string;
  gravetat: Gravetat;
  frequencia: SelectorFrequencia [];
  selected: boolean;
}
export class Gravetat {
  descripcio: string;
  id: number;
}
export class SelectorFrequencia {
  id: number;
  evidencia: string;
  frequencia: Frequencia;
  risc: Risc;
}
export class Frequencia {
  descripcio: string;
  id: number;
}
export class Risc {
 descripcio: string;
 id: number;
}

export class EnvironmentRelacional {
  school: boolean = false;
  social: boolean = false;
  family: boolean = false;
}

export class EnvironmentMaterial {
  house: boolean = false;
  economic: boolean = false;
  work: boolean = false;
}
export class TabsDisabled {
  tabAmbitMaterialActivate: boolean = true;
  tabAmbitRelacionalActivate: boolean = true;
  tabGlobalitatCasActivate: boolean = true;
  tabValoracioDiagnosticActivate: boolean = true;


}






/*---------------------------*/
export class TableTabsForm {
  ssb: string;
  persona: string[] = [];
  gravetat: string[] = [];
  frequencia: string[] = [];
  entorn: string = "Basic" ;
  help: string ;
  apl: boolean = false ;
}

export class TabAutonomia {
  tableTabsForms: TableTabsForm [];
}

export class RowsQuest {
  constructor( prefId: number , prefSsb: string ) {

    this.ssb = prefSsb;
    this.id = prefId;

  }
  public id: number;
  ssb: string;
  persona: string;
  gravetat: string;
  frequencia: string;
}
export class ContextRows {
  contextRows: Context[];
}
export class Context {
  fdc: string;
  persona: string[] = [];
  tipo: string[] = [];
  apl: boolean = false;
}





export class TableTabsForm {
  ssb: string;
  persona: string[] = [];
  gravetat: string[] = [];
  frequencia: string[] = [];
  entorn: string = "Basic" ;
  help: string ;
  apl: boolean: false ;
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

export class TabsDisabled{
  tabAmbitMaterialActivate: boolean = true;
  tabAmbitRelacionalActivate: boolean = true;
  tabGlobalitatCasActivate: boolean = true;
  tabValoracioDiagnosticActivate: boolean = true;


}


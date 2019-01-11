export class TableTabsForm {
  ssb: string;
  persona: string[] = [];
  gravetat: string[] = [];
  frequencia: string[] = [];
}
export class TabAutonomia {
  tableTabsForms: TableTabsForm [] ;
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

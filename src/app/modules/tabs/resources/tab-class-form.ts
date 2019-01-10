export class TableTabsForm {
  ssb: string[] = [];
  persona: string[] = [];
  gravetat: string[] = [];
  frequencia: string[] = [];
}
export class TabAutonomia {
  tableTabsForms: TableTabsForm [] ;
}

export class RowsQuest {
  constructor( prefSsb?: string ) {

    this.ssb = prefSsb;

  }
  id: number;
  ssb: string;
  persona: string;
  gravetat: string;
  frequencia: string;
}

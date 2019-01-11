import {Component, Input, OnInit} from '@angular/core';
import {RowsQuest, TabAutonomia} from '../../resources/tab-class-form';

@Component({
  selector: 'app-form-tab',
  templateUrl: './form-tab.component.html',
  styleUrls: ['./form-tab.component.scss']
})
export class FormTabComponent implements OnInit {
  rows: RowsQuest [] = [];
  @Input() data: TabAutonomia = new TabAutonomia();
  constructor() {

  }

  ngOnInit() {
  }

  addRow( i: number, ssb: string) {
    this.rows[this.rows.length] = new RowsQuest(i, ssb);
  }

}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { EnvironmentMaterial, EnvironmentRelacional, RowsQuest, TabAutonomia} from '../../resources/tab-class-form';

@Component({
  selector: 'app-form-tab',
  templateUrl: './form-tab.component.html',
  styleUrls: ['./form-tab.component.scss']
})
export class FormTabComponent implements OnInit {
  rows: RowsQuest [] = [];
  @Input() data: TabAutonomia = new TabAutonomia();
  @Input () groupRelacional: EnvironmentRelacional = new EnvironmentRelacional();
  @Input () groupMaterial: EnvironmentMaterial = new EnvironmentMaterial();
  @Output () before: EventEmitter<boolean> = new EventEmitter();
  constructor() {

  }

  ngOnInit() {
  }

  addRow( i: number, ssb: string) {
    this.rows.push(new RowsQuest(i, ssb));
  }
  emitBefore() {
    this.before.emit();
  }

}

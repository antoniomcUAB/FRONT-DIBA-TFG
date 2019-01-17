import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Context, ContextRows, Entorn, TabAutonomia, TableTabsForm} from '../../resources/tab-class-form';
import {TabsFormService} from '../../services/tabsForm.service';

@Component({
  selector: 'app-ambit-material-tab',
  templateUrl: './ambit-material-tab.component.html',
  styleUrls: ['./ambit-material-tab.component.scss']
})
export class AmbitMaterialTabComponent {
  data: TabAutonomia = new TabAutonomia();
  contextData: ContextRows = new ContextRows();
  @Input() entorns: Entorn = new Entorn();
  @Output () endForm: EventEmitter<boolean> = new EventEmitter();
  @Output () before: EventEmitter<boolean> = new EventEmitter();

  constructor(private _service: TabsFormService) {
    this.reloadData();
  }



  reloadData() {
    this._service.getFilesForm().subscribe((tab: TabAutonomia ) => {
      this.data = tab;
    });

    this._service.getFilesRelacional().subscribe((contx: ContextRows) => {
      this.contextData = contx;
    });
  }
  public emitEnd() {
    this.endForm.emit();
  }
  public emitBefore() {
    this.before.emit();
  }

}

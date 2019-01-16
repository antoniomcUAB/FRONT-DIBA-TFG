import {Component, EventEmitter, Output} from '@angular/core';
import {Context, ContextRows, TabAutonomia} from '../../resources/tab-class-form';
import {TabsFormService} from '../../services/tabsForm.service';


@Component({
  selector: 'app-ambit-autonomia-tab',
  templateUrl: './ambit-autonomia-tab.component.html',
  styleUrls: ['./ambit-autonomia-tab.component.scss']
})
export class AmbitAutonomiaTabComponent {

  data: TabAutonomia = new TabAutonomia();
  contextData: ContextRows = new ContextRows();
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
  public emitBefore() {
  this.before.emit();
  }
  public emitEnd() {
    this.endForm.emit();
  }
}

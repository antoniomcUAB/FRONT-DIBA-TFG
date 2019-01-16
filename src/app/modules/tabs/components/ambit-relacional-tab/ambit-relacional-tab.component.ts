import {Component, EventEmitter, Output} from '@angular/core';
import {ContextRows, TabAutonomia} from '../../resources/tab-class-form';
import {TabsFormService} from '../../services/tabsForm.service';

@Component({
  selector: 'app-ambit-relacional-tab',
  templateUrl: './ambit-relacional-tab.component.html',
  styleUrls: ['./ambit-relacional-tab.component.scss']
})
export class AmbitRelacionalTabComponent {

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
      console.log(this.contextData);
    });
  }
  public emitEnd() {
    this.endForm.emit();
  }
  public emitBefore() {
    this.before.emit();
  }

}

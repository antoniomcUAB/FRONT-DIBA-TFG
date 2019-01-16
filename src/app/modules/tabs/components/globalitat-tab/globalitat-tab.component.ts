import {Component, EventEmitter, Output} from '@angular/core';
import {ContextRows, TabAutonomia} from '../../resources/tab-class-form';
import {TabsFormService} from '../../services/tabsForm.service';

@Component({
  selector: 'app-globalitat-tab',
  templateUrl: './globalitat-tab.component.html',
  styleUrls: ['./globalitat-tab.component.scss']
})
export class GlobalitatTabComponent{
  contextData: ContextRows = new ContextRows();
  @Output () endForm: EventEmitter<boolean> = new EventEmitter();
  @Output () before: EventEmitter<boolean> = new EventEmitter();

  constructor(private _service: TabsFormService) {
    this.reloadData();
  }



  reloadData() {
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

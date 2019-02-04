import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Ambits, ContextRows, EnvironmentRelacional, TabAutonomia} from '../../models/tab-class-form';
import {TabsFormService} from '../../services/tabsForm.service';

@Component({
  selector: 'app-ambit-relacional-tab',
  templateUrl: './ambit-relacional-tab.component.html',
  styleUrls: ['./ambit-relacional-tab.component.scss']
})
export class AmbitRelacionalTabComponent {

  ambits: Ambits = new Ambits();
  context: string = 'RELACIONAL';
  @Output () endForm: EventEmitter<boolean> = new EventEmitter();
  @Output () before: EventEmitter<boolean> = new EventEmitter();
  @Input() groupRelacional: EnvironmentRelacional = new EnvironmentRelacional();

  constructor(private _service: TabsFormService) {
    this.reloadData();
  }



  reloadData() {
    this._service.getFilesFormModel().subscribe((tab: Ambits ) => {
      this.ambits = tab;
    });
  }
  public emitEnd() {
    this.endForm.emit();
  }
  public emitBefore() {
    this.before.emit();
  }

}

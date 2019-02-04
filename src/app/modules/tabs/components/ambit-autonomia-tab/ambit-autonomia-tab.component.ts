import {Component, EventEmitter, Output} from '@angular/core';
import {Ambits, ContextRows, TabAutonomia} from '../../models/tab-class-form';
import {TabsFormService} from '../../services/tabsForm.service';


@Component({
  selector: 'app-ambit-autonomia-tab',
  templateUrl: './ambit-autonomia-tab.component.html',
  styleUrls: ['./ambit-autonomia-tab.component.scss']
})
export class AmbitAutonomiaTabComponent {
  ambits: Ambits = new Ambits();
  context: string = 'Autonomia';
  @Output () endForm: EventEmitter<boolean> = new EventEmitter();
  @Output () before: EventEmitter<boolean> = new EventEmitter();
  @Output () active: EventEmitter<boolean> = new EventEmitter();

  constructor(private _service: TabsFormService) {
    this.reloadData();
    this.activate();

  }



  public activate() {
    this.active.emit(true);
  }
  reloadData() {
    this._service.getFilesFormModel().subscribe((tab: Ambits ) => {
      this.ambits = tab;
    });
  }
  public emitBefore() {
  this.before.emit();
  }
  public emitEnd() {
    this.endForm.emit();
  }
}

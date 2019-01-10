import {Component, EventEmitter, Output} from '@angular/core';
import { TabAutonomia } from '../../resources/tab-class-form';
import {NewService} from '../../services/new.service';


@Component({
  selector: 'app-ambit-autonomia-tab',
  templateUrl: './ambit-autonomia-tab.component.html',
  styleUrls: ['./ambit-autonomia-tab.component.scss']
})
export class AmbitAutonomiaTabComponent {

  data: TabAutonomia = new TabAutonomia();
  @Output () endForm: EventEmitter<boolean> = new EventEmitter();

  constructor(private _service: NewService) {
    this.reloadData();
  }



  reloadData() {
    this._service.getFiles().subscribe((tab: TabAutonomia ) => {
      this.data = tab;
      console.log(this.data);
    });
  }
  public emitEnd() {
    this.endForm.emit();
  }
}

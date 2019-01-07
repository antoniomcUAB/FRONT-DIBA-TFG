import {Component, EventEmitter, Output} from '@angular/core';
import {TableTabsForm} from '../../resources/tab-class-form';
import {NewService} from '../../services/new.service';


@Component({
  selector: 'app-ambit-autonomia-tab',
  templateUrl: './ambit-autonomia-tab.component.html',
  styleUrls: ['./ambit-autonomia-tab.component.scss']
})
export class AmbitAutonomiaTabComponent {


  data: TableTabsForm;
  @Output () endForm: EventEmitter<boolean> = new EventEmitter();

  constructor(private _service: NewService) {
    this.reloadData();
  }



  reloadData() {
    this._service.getFiles().subscribe((tab: TableTabsForm ) => {
      this.data = tab;
      console.log(this.data);
    });
  }
  public emitEnd(){
    this.endForm.emit();
  }
}

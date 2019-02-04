import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Ambits, ContextRows, TabAutonomia} from '../../models/tab-class-form';
import {TabsFormService} from '../../services/tabsForm.service';

@Component({
  selector: 'app-globalitat-tab',
  templateUrl: './globalitat-tab.component.html',
  styleUrls: ['./globalitat-tab.component.scss']
})
export class GlobalitatTabComponent implements OnInit{
  ambits: Ambits = new Ambits();
  @Output () endForm: EventEmitter<boolean> = new EventEmitter();
  @Output () before: EventEmitter<boolean> = new EventEmitter();
  @Output() tabActivated: EventEmitter <void> = new EventEmitter();

  constructor(private _service: TabsFormService) {
    this.reloadData();
  }

  ngOnInit(): void {
    this.reloadData();
    this.tabActivated.emit();
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

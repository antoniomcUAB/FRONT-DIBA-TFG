import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Ambits, ContextRows, TabAutonomia} from '../../models/tab-class-form';
import {TabsFormService} from '../../services/tabsForm.service';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {CustomInput} from "../../../../shared";

@Component({
  selector: 'app-globalitat-tab',
  templateUrl: './globalitat-tab.component.html',
  styleUrls: ['./globalitat-tab.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: GlobalitatTabComponent, multi: true}
  ]
})
export class GlobalitatTabComponent extends CustomInput implements OnInit {
  ambits: Ambits = new Ambits();
  context: string = 'MATERIAL I INSTRUMENTAL';
  @Output () endForm: EventEmitter<boolean> = new EventEmitter();
  @Output () before: EventEmitter<boolean> = new EventEmitter();
  @Output() tabActivated: EventEmitter <void> = new EventEmitter();

  constructor(private _service: TabsFormService) {
    super();
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

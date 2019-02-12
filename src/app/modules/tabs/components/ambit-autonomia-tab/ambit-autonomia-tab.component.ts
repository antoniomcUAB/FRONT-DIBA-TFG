import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Ambits} from '../../models/tab-class-form';
import {TabsFormService} from '../../services/tabsForm.service';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {CustomInput} from "../../../../shared";
import {Persona} from "../../../files";


@Component({
  selector: 'app-ambit-autonomia-tab',
  templateUrl: './ambit-autonomia-tab.component.html',
  styleUrls: ['./ambit-autonomia-tab.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: AmbitAutonomiaTabComponent, multi: true}
  ]
})
export class AmbitAutonomiaTabComponent extends CustomInput {
  ambits: Ambits = new Ambits();
  context: string = 'Autonomia';
  @Input() personsSelector: Persona [] = [];
  @Output () endForm: EventEmitter<boolean> = new EventEmitter();
  @Output () before: EventEmitter<boolean> = new EventEmitter();
  @Output () active: EventEmitter<boolean> = new EventEmitter();

  constructor(private _service: TabsFormService) {
    super();
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
  selectorPersons()
  {

  }
}

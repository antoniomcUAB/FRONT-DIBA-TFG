import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Ambits, ContextRows, EnvironmentRelacional, TabAutonomia} from '../../models/tab-class-form';
import {TabsFormService} from '../../services/tabsForm.service';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {CustomInput} from "../../../../shared";
import {Persona} from "../../../files";

@Component({
  selector: 'app-ambit-relacional-tab',
  templateUrl: './ambit-relacional-tab.component.html',
  styleUrls: ['./ambit-relacional-tab.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: AmbitRelacionalTabComponent, multi: true}
  ]
})
export class AmbitRelacionalTabComponent extends CustomInput{

  ambits: Ambits = new Ambits();
  context: string = 'RELACIONAL';
  @Input() personsSelector: Persona [] = [];
  @Input() idDiagnostic: number;
  @Output () endForm: EventEmitter<boolean> = new EventEmitter();
  @Output () before: EventEmitter<boolean> = new EventEmitter();
  @Input() groupRelacional: EnvironmentRelacional = new EnvironmentRelacional();

  constructor(private _service: TabsFormService) {
    super();
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

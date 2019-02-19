import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Ambits, ContextRows, EnvironmentMaterial, EnvironmentRelacional, TabAutonomia} from '../../models/tab-class-form';
import {TabsFormService} from '../../services/tabsForm.service';
import {CustomInput} from "../../../../shared";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {Persona} from "../../../files";

@Component({
  selector: 'app-ambit-material-tab',
  templateUrl: './ambit-material-tab.component.html',
  styleUrls: ['./ambit-material-tab.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: AmbitMaterialTabComponent, multi: true}
  ]
})
export class AmbitMaterialTabComponent extends CustomInput {
  ambits: Ambits = new Ambits();
  context: string = 'MATERIAL I INSTRUMENTAL';
  @Input() personsSelector: Persona [] = [];
  @Input() idDiagnostic: number;
  @Input() groupMaterial: EnvironmentMaterial = new EnvironmentMaterial();
  @Output () endForm: EventEmitter<boolean> = new EventEmitter();
  @Output () before: EventEmitter<boolean> = new EventEmitter();

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

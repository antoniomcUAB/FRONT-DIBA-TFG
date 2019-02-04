import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Ambits, ContextRows, EnvironmentMaterial, EnvironmentRelacional, TabAutonomia} from '../../models/tab-class-form';
import {TabsFormService} from '../../services/tabsForm.service';

@Component({
  selector: 'app-ambit-material-tab',
  templateUrl: './ambit-material-tab.component.html',
  styleUrls: ['./ambit-material-tab.component.scss']
})
export class AmbitMaterialTabComponent {
  ambits: Ambits = new Ambits();
  context: string = 'MATERIAL I INSTRUMENTAL';
  @Input() groupMaterial: EnvironmentMaterial = new EnvironmentMaterial();
  @Output () endForm: EventEmitter<boolean> = new EventEmitter();
  @Output () before: EventEmitter<boolean> = new EventEmitter();

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

import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-ambit-material-tab',
  templateUrl: './ambit-material-tab.component.html',
  styleUrls: ['./ambit-material-tab.component.scss']
})
export class AmbitMaterialTabComponent{

  @Output () endForm: EventEmitter<boolean> = new EventEmitter();


  public emitEnd(){
    this.endForm.emit();
  }

}

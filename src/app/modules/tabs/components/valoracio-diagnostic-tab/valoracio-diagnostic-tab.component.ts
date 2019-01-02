import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-valoracio-diagnostic-tab',
  templateUrl: './valoracio-diagnostic-tab.component.html',
  styleUrls: ['./valoracio-diagnostic-tab.component.scss']
})
export class ValoracioDiagnosticTabComponent  {

  @Output () endForm: EventEmitter<boolean> = new EventEmitter();


  public emitEnd(){
    this.endForm.emit();
  }


}

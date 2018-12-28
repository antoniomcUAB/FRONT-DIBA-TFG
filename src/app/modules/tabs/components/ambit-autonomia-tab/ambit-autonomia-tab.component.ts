import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-ambit-autonomia-tab',
  templateUrl: './ambit-autonomia-tab.component.html',
  styleUrls: ['./ambit-autonomia-tab.component.scss']
})
export class AmbitAutonomiaTabComponent {

  @Output () endForm: EventEmitter<boolean> = new EventEmitter();


  public emitEnd(){
    this.endForm.emit();
  }
}

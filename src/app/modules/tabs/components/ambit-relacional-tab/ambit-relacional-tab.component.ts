import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-ambit-relacional-tab',
  templateUrl: './ambit-relacional-tab.component.html',
  styleUrls: ['./ambit-relacional-tab.component.scss']
})
export class AmbitRelacionalTabComponent {

  @Output () endForm: EventEmitter<boolean> = new EventEmitter();
  @Input() child: boolean;

  public emitEnd(){
    this.endForm.emit();
  }


}

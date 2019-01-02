import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-globalitat-tab',
  templateUrl: './globalitat-tab.component.html',
  styleUrls: ['./globalitat-tab.component.scss']
})
export class GlobalitatTabComponent{

  @Output () endForm: EventEmitter<boolean> = new EventEmitter();


  public emitEnd(){
    this.endForm.emit();
  }


}

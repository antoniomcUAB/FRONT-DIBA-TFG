import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-check-form',
  templateUrl: './check-form.component.html',
  styleUrls: ['./check-form.component.scss']
})
export class CheckFormComponent{
  public situationSelected: string = null;
  public childSelected: string = null;
  @Input () child: boolean = false;
  @Input () comesFrom: string;
  @Input () viewButton: boolean;
  @Output () stay: EventEmitter<boolean> = new EventEmitter();
  @Output () childEmitter: EventEmitter<boolean> = new EventEmitter();

  public emitStay(stay: boolean) {
    if (this.child) {
      this.situationSelected = stay ? 'si' : 'no';
    }
    else {
      this.stay.emit(stay);
    }

  }public emitChild(child: boolean) {
    this.childSelected = child ? 'si': 'no';
    if(this.situationSelected != null ) {
      this.childEmitter.emit(child);
      this.stay.emit(this.situationSelected === 'si' ? true : false);

    }
  }

}

import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-check-form',
  templateUrl: './check-form.component.html',
  styleUrls: ['./check-form.component.scss']
})
export class CheckFormComponent{
  @Input () comesFrom: string;
  @Input () viewButton: boolean;
  @Output () stay: EventEmitter<boolean> = new EventEmitter();
  @Output () childEmitter: EventEmitter<boolean> = new EventEmitter();

  public emitStay(stay: boolean) {
      this.stay.emit(stay);
  }

}

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Entorn} from '../../resources/tab-class-form';

@Component({
  selector: 'app-check-form',
  templateUrl: './check-form.component.html',
  styleUrls: ['./check-form.component.scss']
})
export class CheckFormComponent {
  @Input () comesFrom: string;
  @Input () access: boolean;
  @Input () viewButton: boolean;
  @Output () stay: EventEmitter<boolean> = new EventEmitter();
  @Output () childEmitter: EventEmitter<boolean> = new EventEmitter();
  @Input () group: Entorn = new Entorn();
  @Output() entorns: EventEmitter <Entorn> = new EventEmitter();

  public emitStay(stay: boolean) {
      this.stay.emit(stay);
      this.entorns.emit(this.group);
  }
  public print() {
    console.log(this.group);
  }

}

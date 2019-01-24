import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EnvironmentMaterial, EnvironmentRelacional} from '../../resources/tab-class-form';
import {TabsFormService} from "../../services/tabsForm.service";

@Component({
  selector: 'app-check-form',
  templateUrl: './check-form.component.html',
  styleUrls: ['./check-form.component.scss']
})
export class CheckFormComponent implements OnInit{
  @Input () comesFrom: string;
  @Input () access: boolean;
  @Input () ambit: string;
  @Input () viewButton: boolean;
  @Output () stay: EventEmitter<boolean> = new EventEmitter();
  @Output () childEmitter: EventEmitter<boolean> = new EventEmitter();
  @Input () groupRelacional: EnvironmentRelacional = new EnvironmentRelacional();
  @Output() entornsRelacional: EventEmitter <EnvironmentRelacional> = new EventEmitter();
  @Input () groupMaterial: EnvironmentMaterial = new EnvironmentMaterial();
  @Output() entornsMaterial: EventEmitter <EnvironmentMaterial> = new EventEmitter();
  @Output() tabActivated: EventEmitter <void> = new EventEmitter();

  constructor() {
  }
  ngOnInit(): void {
    this.tabActivated.emit();
  }

  public emitStay(stay: boolean) {
      this.stay.emit(stay);
  }
  public emitStayRelacional() {
    let clicked = false;
    if (this.groupRelacional.family || this.groupRelacional.school || this.groupRelacional.social ) {
      clicked = true;
    }
    console.log(this.groupRelacional);
    this.entornsRelacional.emit(this.groupRelacional);
    this.stay.emit(clicked);
  }
  public emitStayMaterial() {
    let clicked = false;
    if (this.groupMaterial.house || this.groupMaterial.work || this.groupMaterial.economic ) {
      clicked = true;
    }
    this.entornsMaterial.emit(this.groupMaterial);
    this.stay.emit(clicked);
  }

}

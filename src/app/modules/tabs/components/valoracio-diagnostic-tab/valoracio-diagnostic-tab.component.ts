import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomInput} from "../../../../shared";
import {NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-valoracio-diagnostic-tab',
  templateUrl: './valoracio-diagnostic-tab.component.html',
  styleUrls: ['./valoracio-diagnostic-tab.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: ValoracioDiagnosticTabComponent, multi: true}
  ]
})
export class ValoracioDiagnosticTabComponent  extends CustomInput implements OnInit{

  @Output () endForm: EventEmitter<boolean> = new EventEmitter();
  @Output () before: EventEmitter<boolean> = new EventEmitter();
  @Output() tabActivated: EventEmitter <void> = new EventEmitter();
  @Input() idDiagnostic: number;
  ngOnInit(): void {
    this.tabActivated.emit();
  }

  public emitEnd(){
    this.endForm.emit();
  }
  public emitBefore() {
    this.before.emit();
  }


}

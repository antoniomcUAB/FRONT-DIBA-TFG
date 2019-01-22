import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-valoracio-diagnostic-tab',
  templateUrl: './valoracio-diagnostic-tab.component.html',
  styleUrls: ['./valoracio-diagnostic-tab.component.scss']
})
export class ValoracioDiagnosticTabComponent implements OnInit{

  @Output () endForm: EventEmitter<boolean> = new EventEmitter();
  @Output () before: EventEmitter<boolean> = new EventEmitter();
  @Output() tabActivated: EventEmitter <void> = new EventEmitter();

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

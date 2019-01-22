import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Context, ContextRows, TabAutonomia} from '../../resources/tab-class-form';

@Component({
  selector: 'app-form-tab-context',
  templateUrl: './form-tab-context.component.html',
  styleUrls: ['./form-tab-context.component.scss']
})
export class FormTabContextComponent implements OnInit {

  @Input() context: ContextRows = new ContextRows();
  @Output () endForm: EventEmitter<boolean> = new EventEmitter();
  constructor() {
  }

  ngOnInit() {
  }

  public emitEnd() {
    this.endForm.emit();
  }


}

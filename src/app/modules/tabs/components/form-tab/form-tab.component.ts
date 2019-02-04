import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Ambits, ContextRows, EnvironmentMaterial, EnvironmentRelacional, RowsQuest} from '../../models/tab-class-form';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form-tab',
  templateUrl: './form-tab.component.html',
  styleUrls: ['./form-tab.component.scss']
})
export class FormTabComponent implements OnInit {
  rows: RowsQuest [] = [];
  closeResult: string;
  cleanSelects: string = null;
  @ViewChild('formTab') formValues;
  @Input() data: Ambits = new Ambits();
  @Input () groupRelacional: EnvironmentRelacional = new EnvironmentRelacional();
  @Input () groupMaterial: EnvironmentMaterial = new EnvironmentMaterial();
  @Output () before: EventEmitter<boolean> = new EventEmitter();
  @Output () endForm: EventEmitter<boolean> = new EventEmitter();
  @Input () contextualitzacio: string;
  selectorTest: {
    severity: string;
    preguntaID: number;
  };
  lista: number[] = [1, 2 , 3 , 4 , 5 , 6 , 7];

  constructor(private modalService: NgbModal) {

  }

  ngOnInit() {
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  addRow( i: number, ssb: string) {
    this.rows.push(new RowsQuest(i, ssb));
  }
  emitBefore() {
    this.before.emit();
  }
  public emitEnd() {
    this.endForm.emit();
  }
  public clean() {
    this.formValues.resetForm();
    if (this.cleanSelects === null) {
      this.cleanSelects = '';
      console.log(this.cleanSelects);
    } else {
      this.cleanSelects = null;
    }

  }

}

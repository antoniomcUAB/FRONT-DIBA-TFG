import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Ambits, ContextRows, EnvironmentMaterial, EnvironmentRelacional, RowsQuest, SelectorGravetat} from '../../models/tab-class-form';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {CustomInput} from "../../../../shared";
import {TabsFormService} from '../../services/tabsForm.service';
import {Frequencia, Gravetat, Preguntes} from "../../models/diagnostic";


@Component({
  selector: 'app-form-tab',
  templateUrl: './form-tab.component.html',
  styleUrls: ['./form-tab.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: FormTabComponent, multi: true}
  ]
})
export class FormTabComponent extends CustomInput implements OnInit  {
  rows: RowsQuest [] = [];
  closeResult: string;
  cleanSelects: string = null;
  severitySelected: Gravetat = new Gravetat();
  @ViewChild('formTab') formValues;
  @Input() data: Ambits = new Ambits();
  @Input () groupRelacional: EnvironmentRelacional = new EnvironmentRelacional();
  @Input () groupMaterial: EnvironmentMaterial = new EnvironmentMaterial();
  @Output () before: EventEmitter<boolean> = new EventEmitter();
  @Output () endForm: EventEmitter<boolean> = new EventEmitter();
  @Input () contextualitzacio: string;

  constructor(private modalService: NgbModal,
              private tabsService: TabsFormService) {
    super();
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
  public newPregunta(pregunta: string , id: number ) {
    if (this.getPregunta(id)) {
      for (let i = 0 ; i < this.value.preguntes.length ; i++) {
        if (this.value.preguntes[i].situacioSocial.id === id) {
          this.value.preguntes.splice(i, 1);
        }
      }
    } else {
      this.value.preguntes.push(new Preguntes(pregunta , id));
    }
}
  public getPregunta(id: number ) {
    if (this.value.preguntes.length !== 0) {
      for (let i = 0; i < this.value.preguntes.length; i++) {
        if (this.value.preguntes[i].situacioSocial.id === id) {
          console.log(this.value.preguntes[i].situacioSocial.id +"//"+ id);
          return this.value.preguntes[i];
        }
      }
    } else {
      return 0;
    }
  }
  public getFrequencia (gravetat:string, selectorsGravetat: SelectorGravetat[]) {
  console.log(selectorsGravetat);
    if (gravetat) {
      return selectorsGravetat.find( data => {
        return data.gravetat.descripcio === gravetat;
      }).frequencia;
    } else {
      return [];
    }
  }
  public riscService( pregunta: string , id: number) {

    let objectPregunta = new Preguntes(pregunta, id);
    objectPregunta.gravetat = this.severitySelected;
    this.tabsService.getRiscOfQuestion(objectPregunta);
    this.tabsService.getRiscOfQuestion(objectPregunta).subscribe((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });
  }
  public getSeveritySelected(id: number) {
    for (let i = 0 ; i < this.value.preguntes.length ; i++) {
      if (this.value.preguntes[i].situacioSocial.id === id) {
        return this.value.preguntes[i].gravetat.descripcio;
      }
    }
  }

}

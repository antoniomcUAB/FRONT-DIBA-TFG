import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CustomInput} from "../../../../shared";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {Ambit, Diagnosis, Risc} from "../../models/diagnostic";
import {TabsFormService} from "../../services/tabsForm.service";
import {Router} from "@angular/router";
import {Ambits} from "../../models/tab-class-form";
import {Evaluacions} from "../../../files";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-valoracio-diagnostic-tab',
  templateUrl: './valoracio-diagnostic-tab.component.html',
  styleUrls: ['./valoracio-diagnostic-tab.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: ValoracioDiagnosticTabComponent, multi: true}
  ]
})
export class ValoracioDiagnosticTabComponent  extends CustomInput implements OnInit {

  @Output () endForm: EventEmitter<boolean> = new EventEmitter();
  @Output () before: EventEmitter<boolean> = new EventEmitter();
  @Output() tabActivated: EventEmitter <void> = new EventEmitter();
  @Input() idDiagnostic: number;
  @Input()
  get diagnostico():any {
    return this.value;
  }
  set diagnostico(value: any) {
    this.value = value;
    this.validationDiagnostic();
  }
  @Output() guardaValoracion: EventEmitter<any> = new EventEmitter<any>();
 public closeResult: string;
  @Input() idExpedient: number;
  public riscos: Risc [] = [];

  constructor(private tabsService: TabsFormService,
              private _router: Router,
              private modalService: NgbModal){
   super();

  }
  ngOnInit(): void {
    this.getRiscos();
    this.tabActivated.emit();
  }

  public emitEnd() {
    this.endForm.emit();
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

  public validationDiagnostic() {
    this.tabsService.putValidationDiagnostic(this.idExpedient,this.value).subscribe((result) => {
      this.value.valoracio = result.valoracio;
    }, (err) => {
      console.log(err);
    });
  }
  public getRisc(descripcioRisc:string , evaluacio:Evaluacions) {
    this.tabsService.getRiscos().subscribe((result) => {
      for (const risc of result) {
        if (risc.descripcio === descripcioRisc) {
          evaluacio.riscProfessional = risc;
        }
      }
    }, (err) => {
      console.log(err);
    });
  }
  public setRisc(risc: Risc , ambit: Ambit , descripcio: string) {

    for (const evaluacio of this.value.valoracio.evaluacions) {
      if (evaluacio.ambit.ambit.id === ambit.ambit.id) {
        evaluacio.riscProfessional = new Risc();
        this.getRisc(descripcio , evaluacio);
      }
    }
  }
  public finishDiagnostic() {
    this.value.valoracio.confirmat = true;
    this.tabsService.finishDiagnostic( this.value , this.idExpedient).subscribe((result) => {
    }, (err) => {
      console.log(err);
    });
    setTimeout(_ => {
      this._router.navigate(['/observations', {'id': this.idDiagnostic, 'date': this.value.data, 'exp': this.idExpedient }]);
    }, 100);

  }
  public getRiscos() {
    this.tabsService.getRiscos().subscribe((result) => {
     this.riscos = result;
    }, (err) => {
      console.log(err);
    });
  }
  public getFilterRiscos(evaluacion:Evaluacions) {
    return this.riscos.filter(data => {
     return data.id !== evaluacion.risc.id;
    });
  }


}

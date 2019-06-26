import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CustomInput, GlobalService} from "../../../../shared";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {Ambit, Diagnosis, Risc} from "../../models/diagnostic";
import {TabsFormService} from "../../services/tabsForm.service";
import {Router} from "@angular/router";
import {Ambits, BreadCrums} from "../../models/tab-class-form";
import {Evaluacions} from "../../../files";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-valoracio-diagnostic-tab',
  templateUrl: './valoracio-diagnostic-tab.component.html',
  styleUrls: ['./valoracio-diagnostic-tab.component.css'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: ValoracioDiagnosticTabComponent, multi: true}
  ]
})
export class ValoracioDiagnosticTabComponent  extends CustomInput implements OnInit {
  public breadcrum: BreadCrums [] = [{url: 'Inici' , name: []} , {url: 'Expedient' , name: []} , {url: 'Diagnostic' , name: []} , {url: 'Valoracio del diagnostic' , name: []}];
  @Output () endForm: EventEmitter<boolean> = new EventEmitter();
  @Output () before: EventEmitter<boolean> = new EventEmitter();
  @Output() tabActivated: EventEmitter <void> = new EventEmitter();
  @Input() nomExpedient: string;
  @Input() nomDiagnostic: string;
  @Input() idDiagnostic: number;
  @Input() idProfessional: string;
  @Input() versioModel: number;
  public view: boolean;
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
              private modalService: NgbModal,
              private global: GlobalService,
              public titleService:Title){
   super();
  this.global.setBreadCrum(this.breadcrum);
  this.view = false;
  }
  ngOnInit(): void {
    this.getRiscos();
    this.tabActivated.emit();
    this.setCrum();
    this.setTitle();
  }

  public emitEnd() {
    this.endForm.emit();
  }
  setTitle() {
    let myDate = new Date();
    let formatData:string;
    formatData = "Data:" + myDate.getDate() +" / "+ (myDate.getMonth() + 1) +" / "+ myDate.getFullYear()+" - Hora: "+ myDate.getHours()+" : "+ myDate.getMinutes();

    this.titleService.setTitle( '#DS-DIBA - ' + this.nomExpedient +" - "+ formatData );
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
      this._router.navigate(['/observations', {'id': this.idDiagnostic, 'date': this.value.data, 'exp': this.idExpedient , 'codi': this.nomExpedient, 'professionalId':this.idProfessional}]);
    }, 300);

  }
  onPrint() {
    this.view = true;
    window.print();
  }
  public getRiscos() {
    this.tabsService.getRiscos().subscribe((result) => {
     this.riscos = result;
    }, (err) => {
      console.log(err);
    });
  }
  public getFilterRiscos(evaluacion: Evaluacions) {
    return this.riscos.filter(data => {
     return data.id !== evaluacion.risc.id;
    });
  }
  public setCrum() {
    if (this.nomDiagnostic && this.nomExpedient) {
      this.breadcrum = [{url: 'Inici', name: []}, {url: 'Expedient '+ this.nomExpedient.toString(), name: [this.idExpedient.toString(), this.idProfessional.toString()]}, {url: this.nomDiagnostic, name: []}, {
        url: 'Valoració del cas',
        name: []
      }];
      this.global.setBreadCrum(this.breadcrum);
    }
  }


}

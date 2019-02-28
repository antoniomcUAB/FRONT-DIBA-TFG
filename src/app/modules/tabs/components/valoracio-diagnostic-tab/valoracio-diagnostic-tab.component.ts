import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomInput} from "../../../../shared";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {Diagnosis, Risc} from "../../models/diagnostic";
import {TabsFormService} from "../../services/tabsForm.service";

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

  @Input() idExpedient: number;
  public riscos: Risc [] = [];
  constructor(private tabsService: TabsFormService){
   super();

  }
  ngOnInit(): void {
    this.getRiscos();
    this.tabActivated.emit();
  }

  public emitEnd() {
    this.endForm.emit();
  }
  public emitBefore() {
    this.before.emit();
  }
  public validationDiagnostic() {
    this.tabsService.putValidationDiagnostic(this.idExpedient,this.value).subscribe((result) => {
      this.value.valoracio = result.valoracio;
    }, (err) => {
      console.log(err);
    });
  }
  public finishDiagnostic() {
    this.value.valoracio.confirmat = true;
    this.tabsService.finishDiagnostic( this.value , this.idExpedient).subscribe((result) => {
    }, (err) => {
      console.log(err);
    });
  }
  public getRiscos() {
    this.tabsService.getRiscos().subscribe((result) => {
      console.log(result);
     this.riscos = result;
    }, (err) => {
      console.log(err);
    });
  }


}

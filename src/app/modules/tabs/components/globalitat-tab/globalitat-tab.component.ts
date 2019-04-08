import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Ambits, BreadCrums, ContextRows, TabAutonomia} from '../../models/tab-class-form';
import {TabsFormService} from '../../services/tabsForm.service';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {CustomInput, GlobalService} from "../../../../shared";
import {Persona} from "../../../files";

@Component({
  selector: 'app-globalitat-tab',
  templateUrl: './globalitat-tab.component.html',
  styleUrls: ['./globalitat-tab.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: GlobalitatTabComponent, multi: true}
  ]
})
export class GlobalitatTabComponent extends CustomInput implements OnInit {
  public breadcrum: BreadCrums [] = [{url: 'Inici' , name: []} , {url: 'Expedient' , name: []} , {url: 'Diagnostic' , name: []} , {url: 'Globalitat del cas' , name: []}];
  ambits: Ambits = new Ambits();
  context: string = 'Globalitat del cas';
  @Input() personsSelector: Persona [] = [];
  @Input() idDiagnostic: number;
  @Input() idExpedient:string;
  @Input() idProfessional:string;
  public versioModel:number;
  /*Esperamos a que llegue el valor del diagnostico*/
  @Input()
  set versio(id:number) {
    if (id) {
      this.versioModel = id;
      this.reloadData();
    }
  }
  @Output () endForm: EventEmitter<boolean> = new EventEmitter();
  @Output () before: EventEmitter<boolean> = new EventEmitter();
  @Output() tabActivated: EventEmitter <void> = new EventEmitter();
  @Input() nomExpedient:string;
  @Input() nomDiagnostic:string;

  constructor(private _service: TabsFormService,
              private global: GlobalService) {
    super();
    this.setCrum();
    global.setBreadCrum(this.breadcrum);
  }
  ngOnInit(): void {
    this.reloadData();
    this.tabActivated.emit();
    this.setCrum();
  }



  reloadData() {
    this._service.getFilesFormModel(this.versioModel.toString()).subscribe((tab: Ambits ) => {
      this.ambits = tab;
    });
  }
  public emitEnd() {
    this.endForm.emit();
  }
  public emitBefore() {
    this.before.emit();
  }
  public setCrum(){
    if(this.nomDiagnostic && this.nomExpedient) {
      this.breadcrum = [{url: 'Inici', name: []}, {url: 'Expedient '+ this.nomExpedient.toString(), name: [this.idExpedient,this.idProfessional]}, {url: this.nomDiagnostic, name: []}, {
        url: 'Globalitat del cas',
        name: []
      }];
      this.global.setBreadCrum(this.breadcrum);
    }
  }

}

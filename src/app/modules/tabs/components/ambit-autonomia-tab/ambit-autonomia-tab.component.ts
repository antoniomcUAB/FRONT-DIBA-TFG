import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Ambits, BreadCrums} from '../../models/tab-class-form';
import {TabsFormService} from '../../services/tabsForm.service';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {CustomInput, GlobalService} from "../../../../shared";
import {Persona} from "../../../files";


@Component({
  selector: 'app-ambit-autonomia-tab',
  templateUrl: './ambit-autonomia-tab.component.html',
  styleUrls: ['./ambit-autonomia-tab.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: AmbitAutonomiaTabComponent, multi: true}
  ]
})
export class AmbitAutonomiaTabComponent extends CustomInput implements OnInit{
  public breadcrum: BreadCrums [] = [];
  ambits: Ambits; /*Ambitos del modelo*/
  context: string = 'Autonomia'; /*Contexto en el que estamos actualmente*/
  @Input() personsSelector: Persona [] = []; /*Selector de Personas para ese Ambito*/
  @Input() idDiagnostic: number; /* El id del diagnostico*/
  @Input() nomExpedient:string;
  @Input() nomDiagnostic:string;
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
  @Output () endForm: EventEmitter<boolean> = new EventEmitter(); /*Emitimos ccuando quieran pasar a la siguiente pestaña*/
  @Output () before: EventEmitter<boolean> = new EventEmitter(); /*Emitimos ccuando quieran volver a la pestaña anterior*/
  @Output () active: EventEmitter<boolean> = new EventEmitter(); /*Emitimos cuando se active el tab*/

  /*Emitimos el activado , y recargamos el modelo*/
  constructor(private _service: TabsFormService,
              private global: GlobalService) {
    super();
    this.activate();
  }


  /*Emitimos el activado*/
  public activate() {
  this.active.emit(true);
  }
  /*Recargamos el modelo*/
  reloadData() {
      this._service.getFilesFormModel(this.versioModel.toString()).subscribe((tab: Ambits) => {
        this.ambits = tab;
      });
  }
  /*Emitimos el before*/
  public emitBefore() {
  this.before.emit();
  }
  /*Emitimos el finalizado*/
  public emitEnd() {
    this.endForm.emit();
  }
  public setCrum(){
    if(this.nomDiagnostic && this.nomExpedient) {
      this.breadcrum = [{url: 'Inici', name: []}, {url: 'Expedient '+ this.nomExpedient.toString(), name: [this.idExpedient,this.idProfessional ]}, {url: this.nomDiagnostic, name: []}, {
        url: 'Àmbit Autonomia',
        name: []
      }];
      this.global.setBreadCrum(this.breadcrum);
    }
  }

  ngOnInit(): void {
    this.setCrum();
  }
}

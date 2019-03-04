import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Ambits,EnvironmentMaterial} from '../../models/tab-class-form';
import {TabsFormService} from '../../services/tabsForm.service';
import {CustomInput} from "../../../../shared";
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {Persona} from "../../../files";

@Component({
  selector: 'app-ambit-material-tab',
  templateUrl: './ambit-material-tab.component.html',
  styleUrls: ['./ambit-material-tab.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: AmbitMaterialTabComponent, multi: true}
  ]
})
export class AmbitMaterialTabComponent extends CustomInput {
  ambits: Ambits = new Ambits(); /*Ambitos del modelo*/
  context: string = 'MATERIAL I INSTRUMENTAL'; /*Contexto en el que nos encontramos*/
  @Input() personsSelector: Persona [] = []; /*Selector de personas Activas*/
  @Input() idDiagnostic: number; /*Id del diagnostico actual*/
  @Input() groupMaterial: EnvironmentMaterial = new EnvironmentMaterial(); /*Objeto para decidir que entornos estan Activados*/
  @Output () endForm: EventEmitter<boolean> = new EventEmitter(); /*Emite cuando se quiere cambiar de Tab*/
  @Output () before: EventEmitter<boolean> = new EventEmitter(); /*Emite cuando se quiere volver atras*/

  /*Recargamos el modelo*/
  constructor(private _service: TabsFormService) {
    super();
    this.reloadData();
  }


  /*Funcion que llama al servicio de recargar el modelo*/
  reloadData() {
    this._service.getFilesFormModel().subscribe((tab: Ambits ) => {
      this.ambits = tab;
    });
  }
  /*Funcion que emite que se quiere cambiar de formulario*/
  public emitEnd() {
    this.endForm.emit();
  }
  /*Funcion que emite que se quiere volver atras*/
  public emitBefore() {
    this.before.emit();
  }

}

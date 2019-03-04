import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Ambits, ContextRows, EnvironmentRelacional, TabAutonomia} from '../../models/tab-class-form';
import {TabsFormService} from '../../services/tabsForm.service';
import {NG_VALUE_ACCESSOR} from "@angular/forms";
import {CustomInput} from "../../../../shared";
import {Persona} from "../../../files";

@Component({
  selector: 'app-ambit-relacional-tab',
  templateUrl: './ambit-relacional-tab.component.html',
  styleUrls: ['./ambit-relacional-tab.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: AmbitRelacionalTabComponent, multi: true}
  ]
})
export class AmbitRelacionalTabComponent extends CustomInput{

  ambits: Ambits = new Ambits(); /*Ambitos del modelo*/
  context: string = 'RELACIONAL'; /*Contexto en el que nos encontramos*/
  @Input() personsSelector: Persona [] = []; /*Selector de personas Activas*/
  @Input() idDiagnostic: number; /*Id del diagnostico actual*/
  @Output () endForm: EventEmitter<boolean> = new EventEmitter(); /*Objeto para decidir que entornos estan Activados*/
  @Output () before: EventEmitter<boolean> = new EventEmitter(); /*Emite cuando se quiere cambiar de Tab*/
  @Input() groupRelacional: EnvironmentRelacional = new EnvironmentRelacional(); /*Emite cuando se quiere volver atras*/

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

import {Component, Input} from '@angular/core';
import {Entorn} from '../../resources/tab-class-form';

const MAX_N_TABS = 5;

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html'
})

export class TabsComponent {
  @Input() entorns: Entorn;

  public stay = false;
  public disapear = false;
  public index: string = '1';
  public indexMaxActive: number = 1;


  public fnStay(stay: boolean){
      this.stay = stay;
      this.disapear = true;
      if (!stay) {
        this.incIndex(1);
        this.disapear = false;
      }

  }
  public goBackCheckForm(id: number) {
    this.stay = false;
    this.incIndex(id);
    this.disapear = false;
    if (this.indexMaxActive < MAX_N_TABS) {
      this.indexMaxActive++;
    }
  }

  public incIndex(id: number) {

    if (id <= MAX_N_TABS) {
      this.index = (id + 1).toString();
    }
  }
  public decIndex() {

    let num = parseInt (this.index) - 1;
    if (num > 0 ) {
      this.index = num.toString();
    }
  }

  public beforeTab() {
    this.stay = false;
    this.disapear = false;

  }
  public activeTab(indexTab: number) {

    return !(indexTab <= this.indexMaxActive);
  }




}




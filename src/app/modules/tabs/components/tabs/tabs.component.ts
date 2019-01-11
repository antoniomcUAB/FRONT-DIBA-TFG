import {Component } from '@angular/core';

const MAX_N_TABS = 5;

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html'
})

export class TabsComponent {

  public stay = false;
  public disapear = false;
  public index: string = '1';


  public fnStay(stay: boolean){
      this.stay = stay;
      this.disapear = true;
      if (!stay) {
        this.incIndex();
        this.disapear = false;
      }

  }
  public goBackCheckForm() {
    this.stay = false;
    this.incIndex();
    this.disapear = false;
  }

  public incIndex() {

    let num = parseInt (this.index) + 1;
    if (num <= MAX_N_TABS) {
      this.index = num.toString();
    }
  }



}




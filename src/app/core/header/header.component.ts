import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public user = { name:`Daniel Meller` };

  @Input() heading: string;
  @Output() toggleSidenav = new EventEmitter<void>();


  constructor() {
  }

  ngOnInit() {
  }
}

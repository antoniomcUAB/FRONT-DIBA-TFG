import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-observations',
  templateUrl: './observations.component.html',
  styleUrls: ['./observations.component.scss']
})
export class ObservationsComponent implements OnInit {

  public id: string;
  public date: string;

  constructor(private _route: ActivatedRoute,
              private _location: Location) {
    this.id = this._route.snapshot.params['id'];
    this.date = this._route.snapshot.params['date'];
  }

  ngOnInit() {
  }

  backClicked() {
    this._location.back();
  }
}

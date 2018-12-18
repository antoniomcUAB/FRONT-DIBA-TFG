import { Component } from '@angular/core';

@Component({
  selector: 'app-file-detail',
  templateUrl: './file-detail.component.html',
  styleUrls: ['./file-detail.component.css']
})
export class FileDetailComponent {

  rows = [];

  constructor() {
    this.fetch((data) => {
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `http://localhost:3000/files`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }
}

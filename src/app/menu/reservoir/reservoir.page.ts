import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservoir',
  templateUrl: './reservoir.page.html',
  styleUrls: ['./reservoir.page.scss'],
})
export class ReservoirPage implements OnInit {

  segmentModel = 'enAttente';
  dataList = [];

  constructor() { }

  ngOnInit() {
  }

  segmentChanged() {
    console.log(this.segmentModel);
    // this.getData();
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}

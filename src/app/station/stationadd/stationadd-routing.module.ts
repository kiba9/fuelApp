import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StationaddPage } from './stationadd.page';

const routes: Routes = [
  {
    path: '',
    component: StationaddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StationaddPageRoutingModule {}

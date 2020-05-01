import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StationlistPage } from './stationlist.page';

const routes: Routes = [
  {
    path: '',
    component: StationlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StationlistPageRoutingModule {}

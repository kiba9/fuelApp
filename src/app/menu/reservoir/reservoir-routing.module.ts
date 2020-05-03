import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservoirPage } from './reservoir.page';

const routes: Routes = [
  {
    path: '',
    component: ReservoirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservoirPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservoiraddPage } from './reservoiradd.page';

const routes: Routes = [
  {
    path: '',
    component: ReservoiraddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservoiraddPageRoutingModule {}

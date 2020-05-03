import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PompesPage } from './pompes.page';

const routes: Routes = [
  {
    path: '',
    component: PompesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PompesPageRoutingModule {}

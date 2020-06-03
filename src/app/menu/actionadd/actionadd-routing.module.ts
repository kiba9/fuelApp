import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActionaddPage } from './actionadd.page';

const routes: Routes = [
  {
    path: '',
    component: ActionaddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActionaddPageRoutingModule {}

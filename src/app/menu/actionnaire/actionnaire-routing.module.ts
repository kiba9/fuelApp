import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActionnairePage } from './actionnaire.page';

const routes: Routes = [
  {
    path: '',
    component: ActionnairePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActionnairePageRoutingModule {}

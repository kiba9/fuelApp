import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexaddPage } from './indexadd.page';

const routes: Routes = [
  {
    path: '',
    component: IndexaddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexaddPageRoutingModule {}

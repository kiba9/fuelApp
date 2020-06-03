import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CmdeaddPage } from './cmdeadd.page';

const routes: Routes = [
  {
    path: '',
    component: CmdeaddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CmdeaddPageRoutingModule {}

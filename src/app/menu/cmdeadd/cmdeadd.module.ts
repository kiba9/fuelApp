import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CmdeaddPageRoutingModule } from './cmdeadd-routing.module';

import { CmdeaddPage } from './cmdeadd.page';

@NgModule({
  declarations: [CmdeaddPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CmdeaddPageRoutingModule
  ],
  entryComponents: [CmdeaddPage]
})
export class CmdeaddPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActionaddPageRoutingModule } from './actionadd-routing.module';

import { ActionaddPage } from './actionadd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActionaddPageRoutingModule
  ],
  declarations: [ActionaddPage]
})
export class ActionaddPageModule {}

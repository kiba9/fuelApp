import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActionnairePageRoutingModule } from './actionnaire-routing.module';

import { ActionnairePage } from './actionnaire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActionnairePageRoutingModule
  ],
  declarations: [ActionnairePage]
})
export class ActionnairePageModule {}

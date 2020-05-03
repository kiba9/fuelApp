import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservoiraddPageRoutingModule } from './reservoiradd-routing.module';

import { ReservoiraddPage } from './reservoiradd.page';

@NgModule({
  declarations: [ReservoiraddPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservoiraddPageRoutingModule
  ],
  entryComponents: [ReservoiraddPage]
})
export class ReservoiraddPageModule {}

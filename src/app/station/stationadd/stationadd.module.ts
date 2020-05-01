import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StationaddPageRoutingModule } from './stationadd-routing.module';

import { StationaddPage } from './stationadd.page';

@NgModule({
  declarations: [StationaddPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StationaddPageRoutingModule
  ],
  entryComponents: [StationaddPage]
})
export class StationaddPageModule {}

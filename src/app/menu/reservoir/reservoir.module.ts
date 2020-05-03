import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservoirPageRoutingModule } from './reservoir-routing.module';

import { ReservoirPage } from './reservoir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservoirPageRoutingModule
  ],
  declarations: [ReservoirPage]
})
export class ReservoirPageModule {}

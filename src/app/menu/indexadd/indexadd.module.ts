import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndexaddPageRoutingModule } from './indexadd-routing.module';

import { IndexaddPage } from './indexadd.page';

@NgModule({
  declarations: [IndexaddPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndexaddPageRoutingModule
  ],
  entryComponents: [IndexaddPage]
})
export class IndexaddPageModule {}

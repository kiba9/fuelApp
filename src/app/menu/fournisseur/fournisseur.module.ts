import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FournisseurPageRoutingModule } from './fournisseur-routing.module';

import { FournisseurPage } from './fournisseur.page';

@NgModule({
  declarations: [FournisseurPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FournisseurPageRoutingModule
  ],
  entryComponents: [FournisseurPage]
})
export class FournisseurPageModule {}

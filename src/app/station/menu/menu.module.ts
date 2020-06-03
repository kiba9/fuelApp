import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MenuPageRoutingModule} from './menu-routing.module';

import {MenuPage} from './menu.page';
import {ReservoiraddPageModule} from '../reservoiradd/reservoiradd.module';
import {FournisseurPageModule} from '../../menu/fournisseur/fournisseur.module';
import {CmdeaddPageModule} from '../../menu/cmdeadd/cmdeadd.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MenuPageRoutingModule,
        ReservoiraddPageModule,
        FournisseurPageModule,
        CmdeaddPageModule
    ],
    declarations: [MenuPage]
})
export class MenuPageModule {
}

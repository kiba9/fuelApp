import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PompesPageRoutingModule} from './pompes-routing.module';

import {PompesPage} from './pompes.page';
import {IndexaddPageModule} from '../indexadd/indexadd.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PompesPageRoutingModule,
        IndexaddPageModule
    ],
    declarations: [PompesPage]
})
export class PompesPageModule {
}

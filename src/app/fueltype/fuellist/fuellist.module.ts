import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {FuellistPageRoutingModule} from './fuellist-routing.module';

import {FuellistPage} from './fuellist.page';
import {FueltypeaddPageModule} from '../fueltypeadd/fueltypeadd.module';
import {SharedComponentsModule} from '../../components/shared-components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FuellistPageRoutingModule,
        FueltypeaddPageModule,
        SharedComponentsModule
    ],
    declarations: [FuellistPage]
})
export class FuellistPageModule {
}

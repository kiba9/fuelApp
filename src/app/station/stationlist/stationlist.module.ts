import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {StationlistPageRoutingModule} from './stationlist-routing.module';

import {StationlistPage} from './stationlist.page';
import {SharedComponentsModule} from '../../components/shared-components.module';
import {StationaddPageModule} from '../stationadd/stationadd.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        StationlistPageRoutingModule,
        SharedComponentsModule,
        StationaddPageModule
    ],
    declarations: [StationlistPage]
})
export class StationlistPageModule {
}

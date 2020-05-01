import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {DashbordPageRoutingModule} from './dashbord-routing.module';

import {DashbordPage} from './dashbord.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DashbordPageRoutingModule
    ],
    declarations: [DashbordPage]
})
export class DashbordPageModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {FueltypeaddPageRoutingModule} from './fueltypeadd-routing.module';

import {FueltypeaddPage} from './fueltypeadd.page';

@NgModule({
    declarations: [FueltypeaddPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FueltypeaddPageRoutingModule
    ],
    entryComponents: [FueltypeaddPage]
})
export class FueltypeaddPageModule {
}

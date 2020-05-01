import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {VendoraddPageRoutingModule} from './vendoradd-routing.module';

import {VendoraddPage} from './vendoradd.page';

@NgModule({
    declarations: [VendoraddPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        VendoraddPageRoutingModule
    ],
    entryComponents: [VendoraddPage]
})
export class VendoraddPageModule {
}

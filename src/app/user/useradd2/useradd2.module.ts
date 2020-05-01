import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {Useradd2PageRoutingModule} from './useradd2-routing.module';

import {Useradd2Page} from './useradd2.page';

@NgModule({
    declarations: [Useradd2Page],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        Useradd2PageRoutingModule
    ],
    entryComponents: [Useradd2Page]
})
export class Useradd2PageModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {UseraddPageRoutingModule} from './useradd-routing.module';

import {UseraddPage} from './useradd.page';
import {Useradd2PageModule} from '../useradd2/useradd2.module';

@NgModule({
    declarations: [UseraddPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UseraddPageRoutingModule,
        Useradd2PageModule
    ],
    entryComponents: [UseraddPage]
})
export class UseraddPageModule {
}

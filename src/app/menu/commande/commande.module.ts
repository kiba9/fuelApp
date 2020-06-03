import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {CommandePageRoutingModule} from './commande-routing.module';

import {CommandePage} from './commande.page';
import {CmdeaddPageModule} from '../cmdeadd/cmdeadd.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CommandePageRoutingModule,
        CmdeaddPageModule
    ],
    declarations: [CommandePage]
})
export class CommandePageModule {
}

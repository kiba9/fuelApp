import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {SettingsComponent} from './settings/settings.component';


@NgModule({
    declarations: [SettingsComponent],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [SettingsComponent],
    entryComponents: [SettingsComponent]
})
export class SharedComponentsModule {
}

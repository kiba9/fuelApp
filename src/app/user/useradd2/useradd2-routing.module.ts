import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {Useradd2Page} from './useradd2.page';

const routes: Routes = [
    {
        path: '',
        component: Useradd2Page
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class Useradd2PageRoutingModule {
}

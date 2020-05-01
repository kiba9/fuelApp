import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {FueltypeaddPage} from './fueltypeadd.page';

const routes: Routes = [
    {
        path: '',
        component: FueltypeaddPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FueltypeaddPageRoutingModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {FuellistPage} from './fuellist.page';

const routes: Routes = [
    {
        path: '',
        component: FuellistPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FuellistPageRoutingModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UseraddPage} from './useradd.page';

const routes: Routes = [
    {
        path: '',
        component: UseraddPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UseraddPageRoutingModule {
}

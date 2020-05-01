import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UserlistPage} from './userlist.page';

const routes: Routes = [
    {
        path: '',
        component: UserlistPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserlistPageRoutingModule {
}

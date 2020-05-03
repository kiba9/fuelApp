import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
    {
        path: 'user/userlist',
        loadChildren: () => import('./user/userlist/userlist.module').then(m => m.UserlistPageModule)
    },
    {
        path: 'dashbord',
        loadChildren: () => import('./dashbord/dashbord.module').then(m => m.DashbordPageModule)
    },
    {
        path: 'fournisseur/vendorlist',
        loadChildren: () => import('./fournisseur/vendorlist/vendorlist.module').then(m => m.VendorlistPageModule)
    },
    {
        path: 'fueltype/fuellist',
        loadChildren: () => import('./fueltype/fuellist/fuellist.module').then(m => m.FuellistPageModule)
    },
  {
    path: 'station/stationlist',
    loadChildren: () => import('./station/stationlist/stationlist.module').then( m => m.StationlistPageModule)
  },
  {
    path: 'station/menu',
    loadChildren: () => import('./station/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'station/menu/actionnaire',
    loadChildren: () => import('./menu/actionnaire/actionnaire.module').then( m => m.ActionnairePageModule)
  },
  {
    path: 'station/menu/pompes',
    loadChildren: () => import('./menu/pompes/pompes.module').then( m => m.PompesPageModule)
  },
  {
    path: 'station/menu/reservoir',
    loadChildren: () => import('./menu/reservoir/reservoir.module').then( m => m.ReservoirPageModule)
  },
  {
    path: 'station/menu/commande',
    loadChildren: () => import('./menu/commande/commande.module').then( m => m.CommandePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

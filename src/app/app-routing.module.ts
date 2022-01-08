import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ActiveGuard } from './shared/guard/active.guard';
import { LoginGuard } from './shared/guard/login/login.guard';

const routes: Routes = [
  {
    path: 'home',
    canActivate : [LoginGuard],
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    canActivate : [ActiveGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'sales',
    loadChildren: () => import('./sales-management/sales-management.module').then( m => m.SalesManagementPageModule)
  },
  {
    path: 'order-summary',
    loadChildren: () => import('./order-summary/order-summary.module').then( m => m.OrderSummaryPageModule)
  },
  {
    path: 'thanks',
    loadChildren: () => import('./thanks/thanks.module').then( m => m.ThanksPageModule)
  },
  {
    path: 'milkcard',
    loadChildren: () => import('./milkcard/milkcard.module').then( m => m.MilkcardPageModule)
  },
  {
    path: 'assign-token',
    loadChildren: () => import('./assign-token/assign-token.module').then( m => m.AssignTokenPageModule)
  },
  {
    path: 'customer-sales',
    loadChildren: () => import('./customer-sales/customer-sales.module').then( m => m.CustomerSalesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash : true, preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

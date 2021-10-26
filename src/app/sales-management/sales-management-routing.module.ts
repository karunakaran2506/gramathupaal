import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesManagementPage } from './sales-management.page';

const routes: Routes = [
  {
    path: '',
    component: SalesManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalesManagementPageRoutingModule {}

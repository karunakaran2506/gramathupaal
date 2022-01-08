import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerSalesPage } from './customer-sales.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerSalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerSalesPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MilkcardPage } from './milkcard.page';

const routes: Routes = [
  {
    path: '',
    component: MilkcardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MilkcardPageRoutingModule {}

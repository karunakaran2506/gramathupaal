import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignTokenPage } from './assign-token.page';

const routes: Routes = [
  {
    path: '',
    component: AssignTokenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignTokenPageRoutingModule {}

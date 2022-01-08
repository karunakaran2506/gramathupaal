import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AssignTokenPageRoutingModule } from './assign-token-routing.module';
import { AssignTokenPage } from './assign-token.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AssignTokenPageRoutingModule,
    SharedModule
  ],
  declarations: [AssignTokenPage]
})
export class AssignTokenPageModule {}

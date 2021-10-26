import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SalesManagementPageRoutingModule } from './sales-management-routing.module';
import { SalesManagementPage } from './sales-management.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule,
    SalesManagementPageRoutingModule
  ],
  declarations: [SalesManagementPage]
})
export class SalesManagementPageModule {}

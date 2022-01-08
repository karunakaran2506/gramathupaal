import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CustomerSalesPageRoutingModule } from './customer-sales-routing.module';
import { CustomerSalesPage } from './customer-sales.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    IonicModule,
    CustomerSalesPageRoutingModule
  ],
  declarations: [CustomerSalesPage]
})
export class CustomerSalesPageModule {}

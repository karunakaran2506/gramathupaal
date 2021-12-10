import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrderSummaryPageRoutingModule } from './order-summary-routing.module';
import { OrderSummaryPage } from './order-summary.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    OrderSummaryPageRoutingModule
  ],
  declarations: [OrderSummaryPage]
})
export class OrderSummaryPageModule {}
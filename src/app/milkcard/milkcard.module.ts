import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MilkcardPageRoutingModule } from './milkcard-routing.module';
import { MilkcardPage } from './milkcard.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MilkcardPageRoutingModule,
    SharedModule
  ],
  declarations: [MilkcardPage]
})
export class MilkcardPageModule {}

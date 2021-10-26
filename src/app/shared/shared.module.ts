import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { MaterialModule } from "./material/material.module";
import { ProductPipe } from "./pipes/product/product.pipe";
import { CartquantityPipe } from './pipes/cartquantity/cartquantity.pipe';

@NgModule({
    declarations : [
        ProductPipe,
        CartquantityPipe
    ],
    imports : [
        CommonModule,
        IonicModule,
        MaterialModule
    ],
    exports : [
        ProductPipe,
        MaterialModule,
        CartquantityPipe
    ]
})

export class SharedModule{}
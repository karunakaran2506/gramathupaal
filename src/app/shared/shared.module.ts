import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { MaterialModule } from "./material/material.module";
import { ProductPipe } from "./pipes/product/product.pipe";
import { CartquantityPipe } from './pipes/cartquantity/cartquantity.pipe';
import { ImagePipe } from './pipes/image/image.pipe';

@NgModule({
    declarations : [
        ProductPipe,
        CartquantityPipe,
        ImagePipe
    ],
    imports : [
        CommonModule,
        IonicModule,
        MaterialModule
    ],
    exports : [
        ProductPipe,
        MaterialModule,
        CartquantityPipe,
        ImagePipe
    ]
})

export class SharedModule{}
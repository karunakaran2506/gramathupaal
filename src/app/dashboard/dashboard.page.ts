import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  totalamount: number = 0;
  subcharges: number = 0;
  subtotal: number = 0;
  taxamount: number = 0;
  cartlength : number;

  screenWidth: number;
  category: Array<any>;
  items: Array<any>;
  products: Array<any>
  activeSegment: string = 'all';
  sliderConfig = {
    slidesPerView: 2.43,
    spaceBetween: 0
  }
  displayedColumns: string[] = ['item', 'quantity', 'price', 'action'];

  constructor(
    private apiservice: ApiService,
    private navCtrl: NavController,
    private alertController: AlertController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {

    // Product alignment for Tablets
    this.screenWidth = window.innerWidth;

    window.onresize = () => {
      this.screenWidth = window.innerWidth;
    };

    if (this.screenWidth > 450) {
      this.sliderConfig = {
        slidesPerView: 4.43,
        spaceBetween: 0
      }
    }

    // 

    // Cart details
    this.items = localStorage.getItem('cartitems') ? JSON.parse(localStorage.getItem('cartitems')) : [];

    if (this.items.length) {
      let totalamount = 0;
      for (let item of this.items) {
        totalamount = totalamount + item.totalamount;
      }
      this.subtotal = totalamount;
      let taxamount1 = (this.subtotal / 100);
      let taxamount2: number = 18 * taxamount1;
      this.taxamount = taxamount2;
      this.totalamount = this.subtotal + this.subcharges;
    }

    // ends

    // category & products

    let storeData = { store: localStorage.getItem('store') };

    this.apiservice.listCategory(storeData)
      .subscribe((data: any) => {
        this.category = data.category;
      })

    this.apiservice.listProduct(storeData)
      .subscribe((data: any) => {
        this.products = data.product;
      })
  }

  segmentChanged(event) {
    this.activeSegment = event.target.value;
  }

  addItem(value, action) {
    let count = this.items.filter(x => x.product === value._id);
    if (count.length === 0) {
      if(action === '+'){
        let price = value.price;
        let cartitem = {
          product: value._id,
          name: value.name,
          unit: value.unit,
          type: value.type,
          productquantity: value.quantity,
          quantity: 1,
          price: price,
          image: value.image,
          subtotal: price * 1,
          totalamount: price * 1
        }
        this.items.push(cartitem);
        localStorage.setItem('cartitems', JSON.stringify(this.items));
        this.presenttoast('Product added to the cart');
        this.ngOnInit();
      }
    }
    else {
      if (action === '+') {
        this.items.map(x => {
          if (x.product === value._id) {
            x.quantity++;
            x.totalamount = ((x.quantity) * value.price);
            x.subtotal = ((x.quantity) * value.price);
          }
        })
      }
      else {
        this.items.map(x => {
          if (x.product === value._id) {
            x.quantity = x.quantity - 1;
            x.totalamount = ((x.quantity) * value.price);
            x.subtotal = ((x.quantity) * value.price);
            if(x.quantity === 0){
              this.items = this.items.filter(y => y.product !== value._id); 
            }
          }
        })
      }
      localStorage.setItem('cartitems', JSON.stringify(this.items));
      this.ngOnInit();
    }
  }

  placeOrder() {

    let data = {
      orderitems : this.items,
      store : localStorage.getItem('store'),
      subtotal : this.subtotal,
      totalamount : this.totalamount
    }
    this.apiservice.placeOrder(data)
     .subscribe((data:any)=>{
       if(data.success){
         this.presenttoast(data.message);
         localStorage.removeItem('cartitems');
         this.ngOnInit();
       }
       else{
         this.presenttoast(data.message);
       }
     })
  }

  removeCart(productId) {
    this.items = this.items.filter(x => x.product !== productId);
    localStorage.setItem('cartitems', JSON.stringify(this.items));
  }

  gotoPage(page){
    this.navCtrl.navigateForward(page);
  }

  async logout() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Are your sure to logout ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Yes',
          handler: () => {
            localStorage.clear();
            this.navCtrl.navigateRoot('/home');
          }
        }
      ]
    });
    await alert.present();
  }

  async presenttoast(txt) {
    const toast = await this.toastCtrl.create({
      message: txt,
      duration: 2500
    });
    toast.present();
  }

}
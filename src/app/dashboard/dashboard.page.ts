import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController, ToastController } from '@ionic/angular';
import { OrderSummaryPage } from '../order-summary/order-summary.page';
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
    private toastCtrl: ToastController,
    private modalCtrl : ModalController
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

      this.getCartItems();

    // ends
  }

  ionViewWillEnter(){
    this.getCartItems();
  }

  getCartItems(){
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
        this.getCartItems();
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
      this.getCartItems();
    }
  }

  async openOrderSummary(){
    const modal = await this.modalCtrl.create({
      component: OrderSummaryPage,
      cssClass: 'my-custom-modal-css'
    })
    return modal.present();
  }

  placeOrder() {
    this.openOrderSummary();
  }

  removeCart(productId) {
    this.items = this.items.filter(x => x.product !== productId);
    localStorage.setItem('cartitems', JSON.stringify(this.items));
    this.getCartItems();
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
            let payLoad = {
              sessiontype : 'out',
              store : localStorage.getItem('store')
            };
            this.apiservice.createSession(payLoad, localStorage.getItem('token'))
             .subscribe((data:any)=>{})
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
      duration: 2500,
      position: 'top'
    });
    toast.present();
  }

}
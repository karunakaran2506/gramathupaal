import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController, ToastController } from '@ionic/angular';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.page.html',
  styleUrls: ['./order-summary.page.scss'],
})
export class OrderSummaryPage implements OnInit {

  items: Array<any>;
  subtotal: number;
  taxamount: number;
  totalamount: number;
  paymentMethod: any;
  amountCollected: number = 0;
  displayedColumns: string[] = ['item', 'quantity', 'price'];
  methods = [
    {
      name: 'Cash',
      value: 'cash'
    },
    {
      name: 'Card',
      value: 'card'
    },
    {
      name: 'UPI / GPay / Phone pe/ PayTM',
      value: 'upi'
    }
  ];

  constructor(
    private modalCtrl: ModalController,
    private apiservice: ApiService,
    private toastCtrl: ToastController,
    private alertController: AlertController,
    private navCtrl : NavController
  ) { }

  ngOnInit() {
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
      this.totalamount = this.subtotal;
    }
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  removeCart(productId) {
    this.items = this.items.filter(x => x.product !== productId);
    localStorage.setItem('cartitems', JSON.stringify(this.items));
  }

  placeOrder() {
    if (this.paymentMethod) {
      let data = {
        orderitems: this.items,
        store: localStorage.getItem('store'),
        subtotal: this.subtotal,
        totalamount: this.totalamount,
        paymentMethod : this.paymentMethod
      }
      this.apiservice.placeOrder(data)
        .subscribe((data: any) => {
          if (data.success) {
            this.presenttoast(data.message);
            localStorage.removeItem('cartitems');
            this.modalCtrl.dismiss();
            this.navCtrl.navigateForward('thanks');
          }
          else {
            this.presenttoast(data.message);
          }
        })
    }
    else {
      this.presenttoast('Select a payment method')
    }
  }

  // async orderAlert() {
  //   const alert = await this.alertController.create({
  //     message: 'Order created successfully',
  //     buttons: [
  //       {
  //         text: 'Ok',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (blah) => {
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  async presenttoast(txt) {
    const toast = await this.toastCtrl.create({
      message: txt,
      duration: 2500
    });
    toast.present();
  }

}
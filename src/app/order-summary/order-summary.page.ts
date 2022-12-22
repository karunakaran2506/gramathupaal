import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
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
  activeSegment = 'existing';
  displayedColumns: any[] = ['item', 'quantity', 'price'];
  methods = [
    {
      name: 'Cash',
      value: 'cash'
    },
    {
      name: 'Credit Card / Debit Card',
      value: 'card'
    },
    {
      name: 'Credit',
      value: 'credit'
    },
    {
      name: 'Free or Donation',
      value: 'free'
    },
    {
      name: 'UPI / GPay / Phone pe / PayTM',
      value: 'upi'
    },
  ];

  tokenMethods = [{
    name: 'Milk Card',
    value: 'milkcard'
  },
  {
    name: 'Token',
    value: 'token'
  }];
   
  customer = new FormControl();
  customerSelected: any;
  customerList: any[] = [];
  filteredOptions: Observable<any[]>;
  addCustomer: FormGroup;
  creditreason: any;

  constructor(
    private modalCtrl: ModalController,
    private apiservice: ApiService,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.items = localStorage.getItem('cartitems') ? JSON.parse(localStorage.getItem('cartitems')) : [];

    this.apiservice.listCustomer()
      .subscribe((data: any) => {
        this.customerList = data?.customer;
      })

    this.addCustomer = new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required)
    });

    this.filteredOptions = this.customer.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

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

  segmentChanged(event: any){
    this.activeSegment = event.target.value;
  }

  removeCart(productId) {
    this.items = this.items.filter(x => x.product !== productId);
    localStorage.setItem('cartitems', JSON.stringify(this.items));
  }

  private _filter(value: string): string[] {
    const filterValue = value?.toLowerCase();
    return this.customerList?.filter(customer => customer?.phone?.toLowerCase().includes(filterValue));
  }

  customerChange(value: string) {
    const customer = this.customerList.filter(customer => customer?.phone === value);
    this.customerSelected = customer[0];
  }

  placeOrder() {
    const customerCondition = this.customerSelected || (this.addCustomer.value.name && this.addCustomer.value.phone)
    const methodCondition = (this.paymentMethod === 'credit' || this.paymentMethod === 'free') ? !!this.creditreason : true;
    if (this.paymentMethod && methodCondition && customerCondition) {

      if ((this.paymentMethod === 'milkcard' || this.paymentMethod === 'token') && (this.items.length > 1)) {
        const message = "Only one product is allowed for this method";
        this.presenttoast(message);
      } else {
        let data: any = {
          orderitems: this.items,
          store: localStorage.getItem('store'),
          subtotal: this.subtotal,
          totalamount: this.totalamount,
          paymentMethod: this.paymentMethod
        };

        if (this.paymentMethod === 'credit' || this.paymentMethod === 'free') {
          data = {
            ...data,
            creditreason: this.creditreason
          }
        }

        if (this.activeSegment === 'new') {
          data = {
            ...data,
            customer: {
              name: this.addCustomer.value.name,
              phone: this.addCustomer.value.phone,
            }
          }
        } else {
          data = {
            ...data,
            customer: {
              id: this.customerSelected?._id
            }
          }
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
    }
    else {
      let message = this.paymentMethod ? '' : 'payment method, ';
      message = `${message}${customerCondition ? '' : 'customer, '}`;
      message = `${message}${methodCondition ? '' : 'reason'}`;
      this.presenttoast(`Select ${message}`)
    }
  }

  async presenttoast(txt) {
    const toast = await this.toastCtrl.create({
      message: txt,
      duration: 2500
    });
    toast.present();
  }

}

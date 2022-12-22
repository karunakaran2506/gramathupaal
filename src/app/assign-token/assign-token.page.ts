import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-assign-token',
  templateUrl: './assign-token.page.html',
  styleUrls: ['./assign-token.page.scss'],
})
export class AssignTokenPage implements OnInit {
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  isDisabled: boolean = false;
  customer = new FormControl();
  producttokenForm: FormGroup;
  customerList: Array<any> = [];
  product: Array<any> = [];
  activeSegment = 'existing';
  productSelected: string;
  totalamount = 0.0;
  customerSelected: any;
  filteredOptions: Observable<any[]>;
  methods = [
    {
      name: 'Cash',
      value: 'cash',
    },
    {
      name: 'Credit Card / Debit Card',
      value: 'card',
    },
    {
      name: 'UPI / GPay / Phone pe / PayTM',
      value: 'upi',
    },
  ];

  constructor(
    private toastCtrl: ToastController,
    private apiservice: ApiService
  ) {}

  ngOnInit() {
    this.apiservice.listCustomer().subscribe((data: any) => {
      this.customerList = data?.customer;
    });

    let payload = {
      store: localStorage.getItem('store'),
    };

    this.apiservice.listProduct(payload).subscribe((data: any) => {
      this.product = data?.product.filter((x: any) => x.milktype === 'a1milk');
    });

    this.producttokenForm = new FormGroup({
      product: new FormControl('', Validators.required),
      quantity: new FormControl(1, Validators.required),
      paymentMethod: new FormControl('', Validators.required),
      name: new FormControl(''),
      phone: new FormControl(''),
    });

    this.filteredOptions = this.customer.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  validation_messages = {
    customer: [{ type: 'required', message: 'Customer is required' }],
    product: [{ type: 'required', message: 'Product is required' }],
    quantity: [{ type: 'required', message: 'Quantity is required' }],
  };

  selectProduct(value: string) {
    this.productSelected = value;
    this.calculatePrice(1);
  }

  changeQuantity(event:any){
    this.calculatePrice(event.target.value);
  }

  customerChange(value: string) {
    const customer = this.customerList.filter(
      (customer) => customer?.phone === value
    );
    this.customerSelected = customer[0];
  }

  calculatePrice(value: any) {
    const product = this.product.find(
      (item: any) => item._id === this.productSelected
    );
    this.totalamount = product.price * value;
  }

  onSubmit(value: any) {
    const customerCondition =
      this.activeSegment === 'existing' ? !!this.customerSelected : true;
    if (this.producttokenForm.status === 'VALID' && customerCondition) {
      let data: any = {
        product: value.product,
        quantity: value.quantity,
        paymentMethod: value.paymentMethod,
        price: this.totalamount,
        store: localStorage.getItem('store'),
      };

      if (this.activeSegment === 'existing') {
        data = {
          ...data,
          customer: {
            id: this.customerSelected,
          },
        };
      } else {
        data = {
          ...data,
          customer: {
            name: value.name,
            phone: value.phone,
          },
        };
      }

      this.apiservice.createProductToken(data).subscribe((data: any) => {
        if (data.success) {
          this.presenttoast(data.message);
          this.formGroupDirective.resetForm();
          this.totalamount = 0;
        } else {
          this.presenttoast(data.message);
        }
        this.isDisabled = false;
      });
    } else {
      this.presenttoast('Enter all valid inputs');
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value?.toLowerCase();
    return this.customerList?.filter((customer) =>
      customer?.phone?.toLowerCase().includes(filterValue)
    );
  }

  segmentChanged(event: any) {
    this.activeSegment = event.target.value;
  }

  async presenttoast(txt) {
    const toast = await this.toastCtrl.create({
      message: txt,
      duration: 2500,
    });
    toast.present();
  }
}

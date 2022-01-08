import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-milkcard',
  templateUrl: './milkcard.page.html',
  styleUrls: ['./milkcard.page.scss'],
})
export class MilkcardPage implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  isDisabled: boolean = false;
  customer = new FormControl();
  milkcardForm: FormGroup;
  customerList: Array<any> = [];
  milkcard: Array<any> = [];
  activeSegment = 'existing';
  totalamount = 0;
  customerSelected: any;
  filteredOptions: Observable<any[]>;

  constructor(
    private toastCtrl: ToastController,
    private apiservice: ApiService
  ) { }

  ngOnInit() {

    this.apiservice.listCustomer()
      .subscribe((data: any) => {
        this.customerList = data?.customer;
      })

    this.apiservice.listMilkcard()
      .subscribe((data: any) => {
        this.milkcard = data?.milkcard;
      })

    this.milkcardForm = new FormGroup({
      milkcard: new FormControl('', Validators.required),
      name: new FormControl(''),
      phone: new FormControl('')
    })

    this.filteredOptions = this.customer.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }

  validation_messages = {
    customer: [
      { type: 'required', message: 'Customer is required' },
    ],
    milkcard: [
      { type: 'required', message: 'Customer is required' },
    ],
  }

  customerChange(value: string) {
    const customer = this.customerList.filter(customer => customer?.phone === value);
    this.customerSelected = customer[0];
  }

  private _filter(value: string): string[] {
    const filterValue = value?.toLowerCase();
    return this.customerList?.filter(customer => customer?.phone?.toLowerCase().includes(filterValue));
  }

  calculatePrice(value: any) {
    const result = value?.split(",");
    const milkcard = this.milkcard.find((item: any) => item._id === result[0]);
    this.totalamount = milkcard.price;
  }

  onSubmit(value: any) {
    const customerCondition = this.activeSegment === 'existing' ? !!this.customerSelected : true;
    if (this.milkcardForm.status === 'VALID' && customerCondition) {
      const milkcard = value?.milkcard?.split(",");
      let data: any = {
        milkcard: milkcard[0],
        validity: milkcard[1],
        store: localStorage.getItem('store')
      };

      if (this.activeSegment === 'existing') {
        data = {
          ...data,
          customer: {
            id: value.customer
          }
        }
      } else {
        data = {
          ...data,
          customer: {
            name: value.name,
            phone: value.phone
          }
        }
      }

      this.apiservice.createMilkcardEntry(data)
        .subscribe((data: any) => {
          if (data.success) {
            this.presenttoast(data.message);
            this.formGroupDirective.resetForm();
            this.totalamount = 0;
          }
          else {
            this.presenttoast(data.message);
          }
          this.isDisabled = false;
        })
    }
    else {
      this.presenttoast('Enter all valid inputs')
    }
  }

  segmentChanged(value: string) {
    this.activeSegment = value;
  }

  async presenttoast(txt) {
    const toast = await this.toastCtrl.create({
      message: txt,
      duration: 2500
    });
    toast.present();
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-customer-sales',
  templateUrl: './customer-sales.page.html',
  styleUrls: ['./customer-sales.page.scss'],
})
export class CustomerSalesPage implements OnInit {

  constructor(private apiservice: ApiService) { }

  customer = new FormControl();
  customerList: any[] = [];
  tokens: Array<any> = [];
  milkcard: Array<any> = [];
  customerSelected: any;
  filteredOptions: Observable<any[]>;

  ngOnInit() {
    this.apiservice.listCustomer()
      .subscribe((data: any) => {
        this.customerList = data?.customer;
      })

      this.filteredOptions = this.customer.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
  }

  customerChange(value: string) {
    const customer = this.customerList.filter(customer => customer?.phone === value);
    this.customerSelected = customer[0];
    this.getData();
  }

  private _filter(value: string): string[] {
    const filterValue = value?.toLowerCase();
    return this.customerList?.filter(customer => customer?.phone?.toLowerCase().includes(filterValue));
  }

  getData() {
    let payload: any = {
      customer: this.customerSelected._id
    }
    this.apiservice.listProductTokenbyCustomer(payload)
      .subscribe((data: any) => {
        this.tokens = data?.token;
      })

    this.apiservice.listMilkcardEntrybyCustomer(payload)
      .subscribe((data: any) => {
        this.milkcard = data?.entry;
      })
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  baseUrl = environment.url + 'api/';

  // User functions

  userLogin(data){
    return this.http.post( this.baseUrl + 'userLogin', data, {})
  }

  // Category Functions
  listCategory(data){
    return this.http.post( this.baseUrl + 'listCategory', data, {})
  }

  // Product Functions
  listProduct(data){
    return this.http.post( this.baseUrl + 'listProduct', data, {})
  }

  // Order Functions
  placeOrder(data){
    return this.http.post( this.baseUrl + 'placeOrder', data, {
      headers : {
        token : localStorage.getItem('token')
      }
    })
  }

  // Cost entry Functions
  saveCostEntry(data){
    return this.http.post( this.baseUrl + 'saveCostEntry', data, {
      headers : {
        token : localStorage.getItem('token')
      }
    })
  }

  createSession(data, token){
    return this.http.post( this.baseUrl + 'createSession', data, {
      headers : {
        token : token
      }
    })
  }

  // Customer Functions
  listCustomer(){
    return this.http.get( this.baseUrl + 'viewCustomerbyStore', {
      headers : {
        store : localStorage.getItem('store')
      }
    })
  }

  // Milk card functions

  createMilkcardEntry(data:any){
    return this.http.post( this.baseUrl + 'createMilkcardEntry', data, {
      headers : {
        token : localStorage.getItem('store')
      }
    })
  }

  listMilkcard(){
    return this.http.get( this.baseUrl + 'listMilkcard', {
      headers : {
        store : localStorage.getItem('store')
      }
    })
  }

  // Product token functions

  createProductToken(data:any){
    return this.http.post( this.baseUrl + 'createProductToken', data, {
      headers : {
        token : localStorage.getItem('store')
      }
    })
  }

  listProductTokenbyCustomer(data:any){
    return this.http.post( this.baseUrl + 'listProductTokenbyCustomer', data, {
      headers : {
        token : localStorage.getItem('token')
      }
    })
  }

  listMilkcardEntrybyCustomer(data:any){
    return this.http.post( this.baseUrl + 'listMilkcardEntrybyCustomer', data, {
      headers : {
        token : localStorage.getItem('token')
      }
    })
  }
}

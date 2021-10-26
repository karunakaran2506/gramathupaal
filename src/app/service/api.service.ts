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
}

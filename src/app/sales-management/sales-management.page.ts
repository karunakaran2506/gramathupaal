import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-sales-management',
  templateUrl: './sales-management.page.html',
  styleUrls: ['./sales-management.page.scss'],
})
export class SalesManagementPage implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  isDisabled : boolean = false;

  costMgtForm : FormGroup;
  selectedDate : Date;
  constructor(
    private toastCtrl : ToastController,
    private apiservice : ApiService
  ) { }

  ngOnInit() {
    this.selectedDate = new Date();

    this.costMgtForm = new FormGroup({
      date : new FormControl(this.selectedDate),
      type : new FormControl('expenses'),
      amount : new FormControl('', Validators.required),
      comment : new FormControl(''),
    })
  }

  validation_messages = {
    date: [
      { type: 'required', message: 'Date is required' },
    ],
    amount: [
      { type: 'required', message: 'Amount is required' }
    ],
    type: [
      { type: 'required', message: 'Type is required' }
    ]
  }

  datechange(event){
    this.selectedDate = event.target.value; 
  }

  onSubmit(value){
    if(this.costMgtForm.status === 'VALID'){
      let data = {
        date : this.selectedDate,
        type: value.type,
        amount: value.amount,
        comment: value.comment,
        store : localStorage.getItem('store'),
      }

      this.apiservice.saveCostEntry(data)
       .subscribe((data:any)=>{
         if(data.success){
          this.presenttoast(data.message);
          this.formGroupDirective.resetForm();
         }
         else{
           this.presenttoast(data.message);
         }
         this.isDisabled = false;
       })
    }
    else{
      this.presenttoast('Enter all valid inputs')
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

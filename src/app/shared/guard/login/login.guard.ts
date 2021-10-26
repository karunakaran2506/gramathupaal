import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private auth : AuthService,
    private navCtrl : NavController
  ){}
  
  canActivate(){
    let result = this.auth.checkToken();
    if(result){
      this.navCtrl.navigateForward('/dashboard');
    }
    return true;
  }
}

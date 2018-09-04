import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { LoginPage } from '../login/login';
import { ListPage } from '../list/list';

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public toastCtrl: ToastController,public usersService: UserServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.userLogout();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

  userLogout(){
    this.usersService.signOutUser().then(authData => {
      
      this.navCtrl.setRoot(LoginPage);
    }, err =>{

      this.navCtrl.setRoot(ListPage);
      let toast = this.toastCtrl.create({
        message: err,
        duration: 300,
        position: 'top'
      });
      toast.present();
    });
  }
}

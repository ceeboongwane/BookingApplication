import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { HomePage } from '../home/home';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  account = { email:'', password:'', name:'', lastname:'', gender:'', id:''};

  constructor(public usersService: UserServiceProvider, public loadingCtrl: LoadingController, public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  doSignUp(){

    var loader = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "please wait...",
      duration: 3000
    });
    loader.present();

    this.usersService.signupUser(this.account).then(authData => {
      loader.dismiss();
      this.navCtrl.setRoot(HomePage);
    }, err =>{
      loader.dismiss();

      let toast = this.toastCtrl.create({
        message: err,
        duration: 300,
        position: 'top'
      });
      toast.present();
    });
    
  }

}

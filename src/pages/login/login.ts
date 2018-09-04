import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController,AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

import { UserServiceProvider } from '../../providers/user-service/user-service';
import { SignupPage } from '../signup/signup';
import { RecoveryPage } from '../recovery/recovery';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public email:string;
  public password:string;

  constructor(public alertCtrl: AlertController,public usersService: UserServiceProvider, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
  }

  

  submitLogin(){

    let loader = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "please wait...",
      duration: 3000
    });
    loader.present();

    this.usersService.loginUser(this.email,this.password).then(authData => {
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

  redirectToSignUp(){
    this.navCtrl.setRoot(SignupPage);
  }

  getPass(){

    const prompt = this.alertCtrl.create({
      title: 'Recovery',
      message: "Enter your email to recieve link to recover your passord",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.usersService.recPass(data.email).then(authData => {
      
              this.navCtrl.setRoot(HomePage);
            }, err =>{
          
        
              let toast = this.toastCtrl.create({
                message: err,
                duration: 300,
                position: 'top'
              });
              toast.present();
            });
            
          }
        }
      ]
    });
    prompt.present();

    
    
  }

}

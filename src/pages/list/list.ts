import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,ToastController,AlertController  } from 'ionic-angular';
import * as firebase from 'firebase';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  
  list = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public usersService: UserServiceProvider,public loadingCtrl: LoadingController, public toastCtrl: ToastController,public alertCtrl: AlertController) {  
    this.bookList();
  
  }

  ionViewWillLoad() {
    
  }


  bookList(){
    var user = firebase.auth().currentUser
    firebase.database().ref("bookings/" + user.uid).on("value", (data: any) => {
      var a = data.val();
      if( a !== null){
        
      
      var keys: any = Object.keys(a);
      
      
      for (var i = 0; i < keys.length; i++){
            var k = keys[i];
 
            let obj = {
              checkIn: a[k].checkIn ,
              cost:a[k].cost ,
              roomType:a[k].roomType ,
              numDays:a[k].numDays ,
              pic:a[k].pic ,
              key:k
 
            }
            this.list.push(obj);
          }
      }else
      {
        console.log('empty')
        const alert = this.alertCtrl.create({
          title: 'Alert!',
          subTitle: 'You did not book a suite click ok to book a suite',
          buttons: ['OK']
        });
        alert.present()
        this.navCtrl.setRoot(HomePage);
      }
    }); 
  }

  remove(key){

    alert(key)
    
    var loader = this.loadingCtrl.create({
      content: "please wait...",
      duration: 3000
    });

    this.usersService.deleteBooking(key).then(authData => {
      loader.dismiss();
      this.list = undefined;
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

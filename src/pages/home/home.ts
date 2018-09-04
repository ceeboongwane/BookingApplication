import { Component } from '@angular/core';
import { NavController, AlertController,LoadingController,ToastController  } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  suiteType:string;
  total:any;
  todaysDate:any;
  booking = { roomType:"", numDays:"" , checkIn:"", cost:0, pic:''  }

  constructor(public loadingCtrl: LoadingController, public toastCtrl: ToastController, public usersService: UserServiceProvider, public  navCtrl: NavController, public alertCtrl: AlertController) {

  }

  book(type,num){
    
    const prompt = this.alertCtrl.create({
      title: 'Booking',
      message: "Complete the following to complete your booking",
      inputs: [
        {
          name: 'num',
          placeholder: 'Number of days',
          type: 'number'
        },
        {
          name: 'date',
          placeholder: 'Check in date',
          type: 'date'
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
            if(type == "QUEEN")
            {
              this.suiteType = "Queen suite";
              this.total = data.num * 1000;
            }
            else if (type == "KING")
            {
              this.suiteType = "King suite";
              this.total = data.num * 2050;
            }
            else if (type == "QUAD")
            {
              this.suiteType = "Quadraple suite";
              this.total = data.num * 800;
            }
            else if (type == "PRE")
            {
              this.suiteType = "Presidential suite";
              this.total = data.num * 1550;
            }
            else if (type == "FAM")
            {
              this.suiteType = "Presidential suite";
              this.total = data.num * 550;
            }

            let currentDate = new Date();
            var year = currentDate.getFullYear();
            var month = currentDate.getMonth() + 1;
            var day = currentDate.getDate();

            if( month > 9 && day > 9){
              var todaysDate = year + "-" + month + "-" + day;
            }
            else if( month > 9 && day < 9){
              var todaysDate = year + "-" +  month + "-"+ "0" + day;
            }
            else if( month < 9 && day > 9){
              var todaysDate = year + "-" + "0" + month + "-" + day;
            }
            else
            {
              var todaysDate = year + "-" + "0" + month + "-"+ "0" + day;
            }
            

            
            if( data.date >= todaysDate && data.num > 0 ){

            this.booking.pic = "../../assets/imgs/" + type + num + ".jpg";
            this.booking.roomType = this.suiteType;
            this.booking.cost = this.total ;
            this.booking.checkIn = data.date;
            this.booking.numDays = data.num;
            
            var loader = this.loadingCtrl.create({
              content: "please wait...",
              duration: 10000

            });
        
            this.usersService.bookUser(this.booking).then(authData => {
              loader.dismiss();
            }, err =>{
              loader.dismiss();
        
              let toast = this.toastCtrl.create({
                message: err,
                duration: 300,
                position: 'top'
              });
              toast.present();
            });

              
            }else{

              let toast = this.toastCtrl.create({
                message: "Please Enter the Correct Information",
                duration: 3000,
                position: 'top'
              });
              toast.present();

            }

            

          
          }
        }
      ]
    });
    prompt.present();
  }

}



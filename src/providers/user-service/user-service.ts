import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

  public data: any;
  public fireAuth: any;
  public userProfile: any;

  constructor(public http: HttpClient) {
      
      this.fireAuth = firebase.auth();
      this.userProfile = firebase.database().ref("users");
  }

  loginUser = function(email: string, password: string){
    return this.fireAuth.signInWithEmailAndPassword(email,password);
  }

  signupUser(account: {}){
    return this.fireAuth.createUserWithEmailAndPassword(account['email'],account['password']).then((newUser) => {
      this.fireAuth.signInWithEmailAndPassword(account['email'],account['password']).then((authenticatedUser) => {
        var user = firebase.auth().currentUser
        firebase.database().ref("users/" + user.uid).set(account);

    });
    });
  }

  bookUser(booking: {}){
    var user = firebase.auth().currentUser
    return firebase.database().ref("bookings/" + user.uid).push(booking);
   
  }


  


  deleteBooking(key:any){

      var user = firebase.auth().currentUser
      return firebase.database().ref("bookings/" + user.uid).child(key).remove();
     
  }

  signOutUser(){
    return this.fireAuth.signOut();
  }
      
  recPass(email: any){
    return this.fireAuth.sendPasswordResetEmail(email);
  }


}

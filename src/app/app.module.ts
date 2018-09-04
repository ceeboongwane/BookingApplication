import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { LogoutPage } from '../pages/logout/logout';
import { RecoveryPage } from '../pages/recovery/recovery';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { UserServiceProvider } from '../providers/user-service/user-service';



export const config = {
  apiKey: "AIzaSyDOEZa7zJ9agadYFr-54lRcxCsy2g8llSo",
  authDomain: "fir-app-831b6.firebaseapp.com",
  databaseURL: "https://fir-app-831b6.firebaseio.com",
  projectId: "fir-app-831b6",
  storageBucket: "fir-app-831b6.appspot.com",
  messagingSenderId: "476412816997"
};
firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    LogoutPage,
    RecoveryPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    LogoutPage,
    RecoveryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider
  ]
})
export class AppModule {}

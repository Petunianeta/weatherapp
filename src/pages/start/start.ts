import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { DataProvider } from '../../providers/data/data';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the StartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
  animations: [

    trigger('flip', [
      state('flipped', style({
        transform: 'rotate(180deg)',
        backgroundColor: '#f50e80'
      })),
      transition('* => flipped', animate('400ms ease'))
    ]),
   
    trigger('flyInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)',
        
      })),
      state('out', style({
        transform: 'translate3d(200%, 0, 0)'
      })),
      // transition('in => out', animate('200ms ease-in')),
      transition('out => in', animate('300ms ease-out',
    
    ))
    ]),
   
    trigger('fade', [
      state('visible', style({
        opacity: 1
      })),
      state('invisible', style({
        opacity: 0.1
      })),
      transition('visible <=> invisible', animate('100ms linear'))
    ]),
   
    trigger('bounce', [
      state('bouncing', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('* => bouncing', [
        animate('300ms ease-in', keyframes([
          style({transform: 'translate3d(0,0,0)', offset: 0}),
          style({transform: 'translate3d(0,-10px,0)', offset: 0.5}),
          style({transform: 'translate3d(0,0,0)', offset: 1})
        ]))
      ])
    ])
   
   ]
   })
   

export class StartPage {
  conversionUnit ;
  info;
infoList;
city: string;
counter = 0;
temparature;
maintemp;
hightemp;
cityname;
value;
// start:boolean;

 flipState: String = 'notFlipped';
 flyInOutState: String = 'out';
 fadeState: String = 'visible';
 bounceState: String = 'noBounce';

visibleState = 'visible';
conditionCode;
iconCode : string;
constructor(public navCtrl: NavController, public navParams: NavParams,private data: DataProvider,private toastCtrl: ToastController ) {
  

}
presentToast() {
  let toast = this.toastCtrl.create({
    message: 'User was added successfully',
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

toggleVisible() {
 this.visibleState = (this.visibleState == 'visible') ? 'invisible' : 'visible';
}

ionViewDidLoad() {
  console.log('ionViewDidLoad StartPage');
}
onSelectChange(selectedValue : any){
 
  this.data.getData(this.city).subscribe(data=>{
    this.info = data;
    console.log(this.info);
    this.infoList = this.info;
    this.toggleFlyInOut();
    this.iconCode = this.info.weather[0].icon;
    
    this.conditionCode = "http://openweathermap.org/img/w/"+ this.iconCode +".png";

   if(this.info.name == "Pretoria"){
     this.counter = 1;
   }else if(this.info.name == "Johannesburg"){
     this.counter = 2;
   }else if(this.info.name == "Durban"){
     this.counter = 3;
   }
})

}
toggleFlip(){
 this.flipState = (this.flipState == 'notFlipped') ? 'flipped' : 'notFlipped';
}

toggleFlyInOut(){
 // this.counter++;
 this.flyInOutState = 'out';

 setInterval(() => {
   this.flyInOutState = 'in';
 }, 1000);

}

toggleFade(){
 this.fadeState = (this.fadeState == 'visible') ? 'invisible' : 'visible';  
}

toggleBounce(){
  this.bounceState = (this.bounceState == 'noBounce') ? 'bouncing' : 'noBounce';  
 }
 select() {
  console.log(this.cityname);
  this.data.getData(this.cityname).subscribe(data => {
    this.info = data;
    console.log(this.info);
    this.infoList = this.info;
    this.toggleFlyInOut();
    this.iconCode = this.info.weather[0].icon;
    this.conditionCode = "http://openweathermap.org/img/w/" + this.iconCode + ".png";


    console.log("--------------------------->" + this.conversionUnit);
    if(this.conversionUnit === "Kelvins"){

      this.temparature = this.info.main.temp;
      this.hightemp =  this.info.main.temp_min;
      this.maintemp = this.info.main.temp_max;

    }else if(this.conversionUnit === "Fahrenheit"){

      this.temparature = (this.info.main.temp - 457.87).toFixed(1);
      this.hightemp =  (this.info.main.temp_min - 457.87).toFixed(1);
      this.maintemp =  (this.info.main.temp_max - 457.87).toFixed(1);

    }else if(this.conversionUnit === "Celsius"){
      this.temparature = (this.info.main.temp - 273.15).toFixed(1);
      this.hightemp =  (this.info.main.temp_min - 273.15).toFixed(1);
      this.maintemp =  (this.info.main.temp_max - 273.15).toFixed(1);
    }

    if (this.info.name == "Pretoria") {
      this.counter = 1;
    } else if (this.info.name == "Johannesburg") {
      this.counter = 2;
    } else if (this.info.name == "Durban") {
      this.counter = 3;
    }
  });

}

 doRefresh(refresher) {
  this.select();
  console.log('Begin async operation', refresher);
  this.data.getData(this.cityname).subscribe(data=>{
    this.info = data;
    console.log(this.info);
    this.infoList = this.info;
    this.toggleFlyInOut();
    this.presentToast();
    
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  })

  
 }
 }

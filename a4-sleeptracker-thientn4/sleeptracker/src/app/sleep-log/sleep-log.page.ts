import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonSlides } from '@ionic/angular';
import { SleepService } from '../services/sleep.service';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { Preferences } from '@capacitor/preferences';


@Component({
  selector: 'app-sleep-log',
  templateUrl: './sleep-log.page.html',
  styleUrls: ['./sleep-log.page.scss'],
})
export class SleepLogPage implements OnInit {
  @ViewChild('slides', {static: true}) slides:IonSlides;
  title="Start time"
  current_time=this.myToISOString(new Date()) //toISOString convert to UTC and ion-calendar cannot distinguish so I need my own
  start_time=new Date().toISOString()
  end_time=new Date().toISOString()
  constructor(public sleepService:SleepService,public navCtrl:NavController) { }

  ngOnInit() {
    console.log(this.current_time)
  }
  toPage(page,submit){
    if(submit){
      Preferences.get({key:'sleep'}).then((val)=>{
        //if not yet in local DB, initialise local DB with default data from SleepService
        if(val.value===null){
          Preferences.set({
            key: 'sleep',
            value: JSON.stringify(SleepService.AllOvernightData),
          });
        }
        //push new data to local DB
        let db_sleep=JSON.parse(val.value)
        db_sleep.push(new OvernightSleepData(
          new Date(this.start_time), 
          new Date(this.end_time)
        ))
        Preferences.set({
          key: 'sleep',
          value: JSON.stringify(db_sleep),
        });
      })
      //update on frontend sleepiness list
      this.sleepService.logOvernightData(
        new OvernightSleepData(
          new Date(this.start_time), 
          new Date(this.end_time)
        )
      )
    }
		this.navCtrl.navigateBack(page)
	}
  slideChanged(){
    this.slides.getActiveIndex().then(
      (index)=>{
        if(index===0)this.title="Start time"
        else this.title="End time"
     });
   }
   myToISOString(date){
    date.setHours(date.getHours() - 8);
    return date.toISOString();
   }
}

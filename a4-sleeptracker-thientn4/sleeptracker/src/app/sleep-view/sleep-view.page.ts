import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SleepService } from '../services/sleep.service';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { Preferences } from '@capacitor/preferences';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-sleep-view',
  templateUrl: './sleep-view.page.html',
  styleUrls: ['./sleep-view.page.scss'],
})
export class SleepViewPage implements OnInit {

  constructor(public changeDetection: ChangeDetectorRef, public sleepService:SleepService,public navCtrl:NavController) { }
  sleepData=SleepService.AllOvernightData;

  ngOnInit() {
    Preferences.get({key:'sleep'}).then((val)=>{
      if(val.value===null){ 
        //if not yet in local DB, initialise local DB with default data from SleepService
        Preferences.set({
          key: 'sleep',
          value: JSON.stringify(SleepService.AllOvernightData),
        });
      }else{
        // set SleepService data to what is from local DB
        SleepService.AllOvernightData=JSON.parse(val.value).map((json_object)=>new OvernightSleepData(
          new Date(json_object.sleepStart),
          new Date(json_object.sleepEnd)
        ))
        // update on frontend sleepiness list
        this.sleepData=SleepService.AllOvernightData
        this.changeDetection.detectChanges();
      }
    })
  }

  get allSleepData() {
		return SleepService.AllOvernightData;
	}

	toPage(page){
    if(page==='/home')
		  this.navCtrl.navigateBack(page)
    else
		  this.navCtrl.navigateForward(page)
	}

  toDate(date){
    return date.toLocaleDateString()
  }

  toTime(date){
    let time=date.toLocaleTimeString()
    return time.length==10?"0"+time:time
  }

}

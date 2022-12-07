import { Component, OnInit, ViewChild, } from '@angular/core';
import { NavController, IonSlides } from '@ionic/angular';
import { SleepService } from '../services/sleep.service';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Preferences } from '@capacitor/preferences';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-sleepiness-view',
  templateUrl: './sleepiness-view.page.html',
  styleUrls: ['./sleepiness-view.page.scss'],
})
export class SleepinessViewPage implements OnInit {
  @ViewChild('slides', {static: true}) slides:IonSlides;

  constructor(public changeDetection: ChangeDetectorRef, public sleepService:SleepService,public navCtrl:NavController) { }
  sleepinessData=SleepService.AllSleepinessData

  ngOnInit() {
    Preferences.get({key:'sleepiness'}).then((val)=>{
      if(val.value===null){ 
        //if not yet in local DB, initialise local DB with default data from SleepService
        Preferences.set({
          key: 'sleepiness',
          value: JSON.stringify(SleepService.AllSleepinessData),
        });
      }else{
        // set SleepService data to what is from local DB
        SleepService.AllSleepinessData=JSON.parse(val.value).map((json_object)=>new StanfordSleepinessData(json_object.loggedValue))
        // update on frontend sleepiness list
        this.sleepinessData=SleepService.AllSleepinessData
        this.changeDetection.detectChanges();
        this.slides.slideTo(SleepService.AllSleepinessData.length,0)
      }
    })
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

  getSleepinessString(scale){
    return StanfordSleepinessData.ScaleValues[scale]
  }

}

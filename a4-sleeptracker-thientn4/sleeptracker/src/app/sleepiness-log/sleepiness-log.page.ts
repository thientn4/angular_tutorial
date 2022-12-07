import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonSlides } from '@ionic/angular';
import { SleepService } from '../services/sleep.service';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-sleepiness-log',
  templateUrl: './sleepiness-log.page.html',
  styleUrls: ['./sleepiness-log.page.scss'],
})
export class SleepinessLogPage implements OnInit {
  @ViewChild('slides', {static: true}) slides:IonSlides;

  constructor(public sleepService:SleepService,public navCtrl:NavController) { }

  ngOnInit() {
  }
  toPage(page,submit){
    if(submit){
      this.slides.getActiveIndex().then(
        (index)=>{
          Preferences.get({key:'sleepiness'}).then((val)=>{
            //if not yet in local DB, initialise local DB with default data from SleepService
            if(val.value===null){
              Preferences.set({
                key: 'sleepiness',
                value: JSON.stringify(SleepService.AllSleepinessData),
              });
            }
            //push new data to local DB
            let db_sleepiness=JSON.parse(val.value)
            db_sleepiness.push(new StanfordSleepinessData(index+1))
            Preferences.set({
              key: 'sleepiness',
              value: JSON.stringify(db_sleepiness),
            });
          })
          //update on frontend sleepiness list
          this.sleepService.logSleepinessData(new StanfordSleepinessData(index+1))
      });
    }
		this.navCtrl.navigateBack(page)
	}
  get allScale() {
		return [1,2,3,4,5,6,7]
	}
  getSleepinessString(scale){
    return StanfordSleepinessData.ScaleValues[scale]
  }

}

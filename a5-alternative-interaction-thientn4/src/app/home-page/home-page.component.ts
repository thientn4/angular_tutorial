import { Component, OnInit } from '@angular/core';
import { PredictionEvent } from '../prediction-event';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  gesture: String = "None";
  score:number = 0;
  total:number = 1;
  gesList=["✋✋","✊✊","☝☝","✊☝","☝✋","✋✊"]
  gesCode=[0,1,2]
  ges1=this.gesList[this.gesCode[0]];
  ges2=this.gesList[this.gesCode[1]];
  ges3=this.gesList[this.gesCode[2]];
  gesTarget=0;
  scored=false;
  gameStarted=false;
  gesTotal=[1,0,0,0,0,0]
  gesScore=[0,0,0,0,0,0]
  constructor() { }

  ngOnInit(): void {
  }

  gameSetup(){
    let start_title=document.getElementById('start_title')
    if(start_title)start_title.style.display='none';
    let scrollElements=document.getElementsByClassName("scroll-element")
    if(scrollElements.length==2){
      console.log('set scroll')
      scrollElements[0].id="primary"
      scrollElements[1].id="secondary"
    }
    console.log('started')
    setInterval(()=>{
      this.total+=1
      this.scored=false;
      this.gesTotal[this.gesTarget]+=1
      if(this.total>3){
        if(this.total%3==1){
          this.gesTarget=this.gesCode[0];
          this.gesCode[1]=Math.floor(Math.random() * 6)
          this.ges2=this.gesList[this.gesCode[1]];
        }
        if(this.total%3==2){
          this.gesTarget=this.gesCode[1];
          this.gesCode[2]=Math.floor(Math.random() * 6)
          this.ges3=this.gesList[this.gesCode[2]];
        }
        if(this.total%3==0){
          this.gesTarget=this.gesCode[2];
          this.gesCode[0]=Math.floor(Math.random() * 6)
          this.ges1=this.gesList[this.gesCode[0]];
        }
      }
    },2000)
  }

  prediction(event: PredictionEvent){
    this.gesture = event.getPrediction();
    if(this.gesture==="6"){
      if(!this.gameStarted){
        let empty=[0,0,0,0,0,0]
        document.location.href="./score?gesScore="+empty+"&gesTotal="+empty
      }
      document.location.href="./score?gesScore="+this.gesScore+"&gesTotal="+this.gesTotal
    }
    if(!this.gameStarted && this.gesture==="0"){
      this.gameStarted=true
      this.gameSetup()
    }
    if(this.gameStarted && (+this.gesture)==this.gesTarget && !this.scored){
      this.gesScore[this.gesTarget]+=1
      this.score+=1
      this.scored=true;
    }
  }

}

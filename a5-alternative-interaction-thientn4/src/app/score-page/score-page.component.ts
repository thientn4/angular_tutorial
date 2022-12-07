import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PredictionEvent } from '../prediction-event';

@Component({
  selector: 'app-score-page',
  templateUrl: './score-page.component.html',
  styleUrls: ['./score-page.component.css']
})
export class ScorePageComponent implements OnInit {
  constructor(private route: ActivatedRoute) { }
  gesList=["✋✋","✊✊","☝☝","✊☝","☝✋","✋✊"]
  gesScore=[0,0,0,0,0,0]
  gesTotal=[0,0,0,0,0,0]
  score=0
  total=0
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.gesScore = params.gesScore.split(",");
        this.gesTotal = params.gesTotal.split(",");
        this.score=0
        this.total=0
        for(let i=0; i<6; i++){
          this.score+=(+this.gesScore[i])
          this.total+=(+this.gesTotal[i])
        }
      }
    );
  }
  prediction(event: PredictionEvent){
    if(event.getPrediction()==="7"){
      document.location.href="../"
    }
  }
}

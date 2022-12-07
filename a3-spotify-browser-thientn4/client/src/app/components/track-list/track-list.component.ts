import { Component, OnInit, Input } from '@angular/core';
import { TrackData } from '../../data/track-data';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.css']
})
export class TrackListComponent implements OnInit {
	@Input() tracks:TrackData[];
	@Input() hideArtist:boolean = false;
	@Input() hideAlbum:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  timeFormat(duration_ms){
    return Math.floor(duration_ms/60000) + ":" + Math.ceil(duration_ms%60000/1000)
  }

}

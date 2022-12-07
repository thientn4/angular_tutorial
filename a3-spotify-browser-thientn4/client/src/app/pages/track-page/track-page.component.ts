import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { TrackFeature } from '../../data/track-feature';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-track-page',
  templateUrl: './track-page.component.html',
  styleUrls: ['./track-page.component.css']
})
export class TrackPageComponent implements OnInit {
	trackId:string;
	track:TrackData;
  audioFeatures:TrackFeature[];

  constructor(private route: ActivatedRoute, private backend: SpotifyService) { }

  ngOnInit() {
  	this.trackId = this.route.snapshot.paramMap.get('id');
  	//TODO: Inject the spotifyService and use it to get the track data and it's audio features
    this.backend.getTrack(this.trackId).then((data)=>{
      //console.log(JSON.stringify(data,null,2))
      this.track=data
    })
    this.backend.getAudioFeaturesForTrack(this.trackId).then((data)=>{
      //console.log(JSON.stringify(data,null,2))
      this.audioFeatures=data
    })
  }

  timeFormat(duration_ms){
    return Math.floor(duration_ms/60000) + ":" + Math.ceil(duration_ms%60000/1000)
  }

}

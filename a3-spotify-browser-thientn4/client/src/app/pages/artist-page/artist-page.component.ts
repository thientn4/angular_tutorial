import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistData } from '../../data/artist-data';
import { TrackData } from '../../data/track-data';
import { AlbumData } from '../../data/album-data';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.css']
})
export class ArtistPageComponent implements OnInit {
	artistId:string;
	artist:ArtistData;
	relatedArtists:ArtistData[];
	topTracks:TrackData[];
	albums:AlbumData[];

  constructor(private route: ActivatedRoute, private backend: SpotifyService) { }

  ngOnInit() {
  	this.artistId = this.route.snapshot.paramMap.get('id');
    //TODO: Inject the spotifyService and use it to get the 
    //  artist data, 
    //  related artists, 
    //  top tracks for the artist,
    //  the artist's albums
    this.backend.getArtist(this.artistId).then((data)=>{
      //console.log(JSON.stringify(data,null,2))
      this.artist=data
    })
    this.backend.getRelatedArtists(this.artistId).then((data)=>{
      //console.log(JSON.stringify(data,null,2))
      this.relatedArtists=data
    })
    this.backend.getTopTracksForArtist(this.artistId).then((data)=>{
      //console.log(JSON.stringify(data,null,2))
      this.topTracks=data
    })
    this.backend.getAlbumsForArtist(this.artistId).then((data)=>{
      //console.log(JSON.stringify(data,null,2))
      this.albums=data
    })
  }

}
import { Component, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {Game} from '../model';
import {HttpService} from '../services/http.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit,OnDestroy{
  gameRating=0;
  gameId!:string;
  game!:Game;
  routeSub!:Subscription;
  gameSub!:Subscription;

  constructor(private ActivatedRoute:ActivatedRoute,private httpservice:HttpService) { }

  ngOnInit(): void {
    this.routeSub=this.ActivatedRoute.params.subscribe((params:Params)=>{this.gameId=params['id'];
  this.getGameDetails(this.gameId)})
  }
  getGameDetails(id:string):void{
    this.gameSub=this.httpservice
    .getGameDetails(id)
    .subscribe((gameResp:Game)=>{
      this.game=gameResp;
      setTimeout(() => {
        this.gameRating=this.game.metacritic;
        
      }, 1000);

    });
  }
  getColor(value:number):string{
    if(value>75){
      return '#5ee432';
    }
    else if(value>50){
      return '#fffa50'
    }
    else if(value>30){
      return '#f7aa38'
    }
    else{
      return '#ef4655'
    }


  }
  ngOnDestroy():void{
    if(this.gameSub){
      this.gameSub.unsubscribe();
      if(this.routeSub){
        this.routeSub.unsubscribe();
      }
    }

  }


}

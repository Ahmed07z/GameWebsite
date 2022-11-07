import { Component, OnDestroy, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {APIResponse, Game} from '../model';
import {HttpService} from '../services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy{
public sort:string="";
  public games!: Array<Game>;
  private routeSub!:Subscription;
  private gameSub!:Subscription;
  constructor(
    private httpservices:HttpService,private activedRoute:ActivatedRoute,private router:Router
  ) { }

  ngOnInit(): void {
  this.routeSub = this.activedRoute.params.subscribe((params:Params)=>{
      if(params['game-search']){
        this.searchGames('meracrit',params['game-search']);
      }
      else{
        this.searchGames('meracrit');
      }
    })
  }
  searchGames(sort:string,search?:string):void{
    this.gameSub=this.httpservices.getGameList(sort,search)
    .subscribe((gamelist:APIResponse<Game>)=>{
      this.games=gamelist.results;
      console.log(gamelist.results);
    })
  }
  openGameDetails(id:string):void{
    this.router.navigate(['details',id]);
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

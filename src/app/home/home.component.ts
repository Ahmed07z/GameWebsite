import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {APIResponse, Game} from '../model';
import {HttpService} from '../services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
public sort:string="";
  public games!: Array<Game>;
  constructor(
    private httpservices:HttpService,private activedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params:Params)=>{
      if(params['game-search']){
        this.searchGames('meracrit',params['game-search']);
      }
      else{
        this.searchGames('meracrit');
      }
    })
  }
  searchGames(sort:string,search?:string):void{
    this.httpservices.getGameList(sort,search)
    .subscribe((gamelist:APIResponse<Game>)=>{
      this.games=gamelist.results;
      console.log(gamelist.results);
    })
  }
  openGameDetails(id:number){}

}

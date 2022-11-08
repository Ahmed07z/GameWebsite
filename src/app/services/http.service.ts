import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from '../model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
private searchData=new BehaviorSubject<string>('');
currentValue=this.searchData.asObservable();

  constructor(private http: HttpClient) { }

  changevalue(searchstring:string){
    this.searchData.next(searchstring);
  }

  getGameList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);

    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params: params,
    });
  }
  getGameDetails(id:string):Observable<Game>{
    const gameInfoRequest =this.http.get(`${env.BASE_URL}/games/${id}`);
    const gameTrailerRequest=this.http.get(`${env.BASE_URL}/games/${id}/movies`);
    const gameScreenshotsRequest=this.http.get(`${env.BASE_URL}/games/${id}/screenshots`);
    return forkJoin({
      gameInfoRequest,
      gameTrailerRequest,
      gameScreenshotsRequest,
    }).pipe(
      map((resp:any)=>{
        return{
          ...resp['gameInfoRequest'],
          screenshots:resp['gameScreenshotsRequest']?.results,
          trailers:resp['gameTrailerRequest']?.results,
          
        }
      })
    )

  }
}
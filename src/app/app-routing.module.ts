import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GameDetailsComponent} from './game-details/game-details.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [

  {path:'',component:HomeComponent},
  {path:'search-game',component:HomeComponent},
  {path:'details/:id',component:GameDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

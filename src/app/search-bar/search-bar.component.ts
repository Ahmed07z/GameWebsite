import { Component, OnInit, Output } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpService} from '../services/http.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchValue!:string;
  constructor(private router:Router,private dataservice:HttpService) { }

  ngOnInit(): void {
    this.dataservice.currentValue.subscribe((searchValue:any) => this.searchValue=searchValue);
  }
  onSubmit(form: NgForm){
    this.router.navigate(['search',form.value.search])
  }
  SearchedValue(){
    this.dataservice.changevalue(this.searchValue);
    console.log(this.searchValue)
  }
  resetValue(){
    this.dataservice.changevalue(this.searchValue='');

  }

}

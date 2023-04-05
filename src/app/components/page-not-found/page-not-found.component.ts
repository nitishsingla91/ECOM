import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {
  public searchText:string='';
  constructor(
    public router: Router)
  {}
  
  search(){
    this.router.navigate(
      ['/search'],
      { 
        queryParams: { text: this.searchText}
      }
    );
  }
}

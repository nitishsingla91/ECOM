import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryRoot } from 'src/app/common/interfaces.defs';
import { ApiService } from 'src/app/services/api.service';
import * as $ from 'jquery'
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public categories: CategoryRoot[]=[];
  public isLoggedIn:Boolean = false;
  public userProfile : any= {};
  public searchText:string='';
  constructor(
    public restApi: ApiService, 
    public router: Router,
    private _service:AuthService)
  {}
  async ngOnInit() {
    this.loadCategories();
    this.isLoggedIn = this._service.checkCredentials();    
    let i = window.location.href.indexOf('code');
    if(!this.isLoggedIn && i != -1){
        this._service.retrieveToken(window.location.href.substring(i + 5));
    }
    if(this.isLoggedIn){
      this._service.getResource(this._service.authServiceUrl+'userinfo').subscribe((data) => {
           this.userProfile = data;
      });
    }
  }
  // Get Categories
  loadCategories() {
    return this.restApi.getCategories().subscribe((data) => {
      this.categories = data;
    });
    
  }

  keycloakLogin(){
    if (!this.isLoggedIn) {
      this._service.login();
    }
  }

  keycloakLogout(){
    this._service.logout();
  }

  search(){
    this.router.navigate(
      ['/search'],
      { 
        queryParams: { text: this.searchText}
      }
    );
  }

  searchByCategory(category:any,id:string,index:any){
    this.router.navigate(
      ['/search'],
      { 
        queryParams: { text: category}
      }
    );
    this.searchText = '';
    // let att:string = '#'+id+index;
    // $(att).removeClass('open , hover');
  }

}

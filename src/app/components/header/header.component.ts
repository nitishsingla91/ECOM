import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { CategoryRoot } from 'src/app/common/interfaces.defs';
import { ApiService } from 'src/app/services/api.service';
declare function customScript():void;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public categories: CategoryRoot[]=[];
  public isLoggedIn:Boolean = false;
  public userProfile :KeycloakProfile= {};
  public searchText:string='';
  constructor(
    public restApi: ApiService, 
    public router: Router,
    public keycloakService:KeycloakService)
  {}
  async ngOnInit() {
    this.loadCategories();
    this.isLoggedIn = await this.keycloakService.isLoggedIn();
    if(this.isLoggedIn){
    this.userProfile = await this.keycloakService.loadUserProfile();
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
        this.keycloakService.login();
    }
  }

  keycloakLogout(){
    this.keycloakService.logout(window.location.origin);
    this.keycloakService.clearToken();
  }

  search(){
    this.router.navigate(
      ['/search'],
      { 
        queryParams: { text: this.searchText}
      }
    );
  }

  searchByCategory(category:any){
    this.router.navigate(
      ['/search'],
      { 
        queryParams: { text: category}
      }
    );
    this.searchText = '';
  }

}

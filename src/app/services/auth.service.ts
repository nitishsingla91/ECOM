import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public redirectUri:any = window.location.origin;
  // public redirectUri:any = environment?.keycloakConfig?.redirectURI;
  public clientId:any = environment.keycloakConfig?.clientId;
  public realm:any =environment?.keycloakConfig.realm;
  public keycloakUrl:any =environment.keycloakConfig.url;
  public keycloakOpenidUrl:string = this.keycloakUrl+'/realms/'+this.realm+'/protocol/openid-connect/';
  public authServiceUrl:string = environment.authServiceUrl;
  public userInfoUrl = this.authServiceUrl+'userinfo'
  public userinfo = {};

  constructor(
    private _http: HttpClient,
    private cookieService: CookieService,
    private jwtHelper: JwtHelperService){}

   retrieveToken(code: string){
    let params = new URLSearchParams();   
    params.append('code',code);
    params.append('redirectURI',this.redirectUri);
    let headers = new HttpHeaders({'Content-type': 'application/json; charset=utf-8'});
     this._http.post(this.authServiceUrl+'token', {"code":code,"redirectURI":this.redirectUri}, { headers: headers })
    .subscribe(
      data => this.saveToken(data),
      err => alert('Invalid Credentials')
    ); 
  }

  async refreshToken(refresh_token: string,){
    let params = new URLSearchParams();   
    params.append('refreshToken',refresh_token);
    let headers = new HttpHeaders({'Content-type': 'application/json; charset=utf-8'});
    const data:any = await this._http.post(this.authServiceUrl+"token/refresh", {"refreshToken":refresh_token}, { headers: headers }).pipe(retry(1), catchError(this.handleError)).toPromise();
    this.saveTokenRefresh(data);
    return this.getKeycloakUser(data.access_token);
  }

  checkRefreshExpired(){
    let refreshToken = this.cookieService.get('refresh_token');
    let refreshExpireDate:any =  this.jwtHelper.getTokenExpirationDate(refreshToken)?.valueOf();
    if(refreshExpireDate - new Date().valueOf() <= 0){
      this.logout();
    }
  }

  getUserInfo(){
    
    let accessToken = this.cookieService.get('access_token');
    let refreshToken = this.cookieService.get('refresh_token');
    let expireDate:any =  this.jwtHelper.getTokenExpirationDate(accessToken)?.valueOf();
    if(expireDate - new Date().valueOf() <= 0){
      return this.refreshToken(refreshToken,);
    }else{
      return this.getKeycloakUser(this.cookieService.get('access_token'));
    }
  }

  async getKeycloakUser(access_token:any){
    var headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Bearer '+ access_token });
    let data:any = await this._http.get(this.userInfoUrl, { headers: headers }).pipe(retry(1), catchError(this.handleError)).toPromise();
    return data;
  }
  checkCredentials(){
    return this.cookieService.check('access_token');
  } 

  logout() {
    let token = this.cookieService.get('id_token');
    this.cookieService.delete('access_token');
    this.cookieService.delete('id_token');
    this.cookieService.delete('refresh_token');
    let logoutURL = this.keycloakOpenidUrl+"logout?id_token_hint="+ token + "&post_logout_redirect_uri=" + this.redirectUri;
    window.location.href=logoutURL
  } 

  login() {
    let loginUrl = this.keycloakOpenidUrl+"auth?client_id="+this.clientId+"&redirect_uri="+this.redirectUri+"&scope=openid&response_type=code"
    window.location.href=loginUrl;
  } 


  saveTokenRefresh(token: any){
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    this.cookieService.set("access_token", token.access_token, expireDate);
    this.cookieService.set("id_token", token.id_token, expireDate);
    this.cookieService.set("refresh_token", token.refresh_token, expireDate);
    console.log('Refreshed Access token');
  }

  saveToken(token: any){
    var expireDate = new Date().getTime() + (1000 * token.expires_in);
    this.cookieService.set("access_token", token.access_token, expireDate);
    this.cookieService.set("id_token", token.id_token, expireDate);
    this.cookieService.set("refresh_token", token.refresh_token, expireDate);
    console.log('Obtained Access token');
    window.location.href = this.redirectUri;
  }
  
  // Error handling
handleError(error: any) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error.message;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  window.alert(errorMessage);
  return throwError(() => {
    return errorMessage;
  });
}

}
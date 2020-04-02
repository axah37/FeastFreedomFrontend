import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { tap, catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { Provider } from './provider';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  url:string="http://localhost:8081";
  public valid:boolean = false;
  constructor(private http:HttpClient) { }

  getAuthority(email:string){
    return this.http.get<any>(this.url+"/register/authority/"+email).pipe(tap(res=>{
      localStorage.setItem('authority',res.authority);
      localStorage.setItem('cur_user',email);
      //console.log(res.authority)
    }));
  }

  login(email:string, password:string){
    const headers =
    {
      headers:new HttpHeaders({
        "Authorization" : "Basic " + btoa("client:123456")
      })
    };
    return this.http.post<{access_token:string,refresh_token:string}>(this.url+"/oauth/token?grant_type=password&username="+email+"&password="+password,{},headers).pipe(tap(res =>{
      localStorage.setItem('access_token', res.access_token);
      localStorage.setItem('refresh_token', res.refresh_token);
      localStorage.setItem('expires',""+(Date.now() + 120000));
      this.valid = true;
      console.log(localStorage.getItem("expires"))
    }));
  }

  logout(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('cur_user');
    localStorage.removeItem('expires');
    localStorage.removeItem('authority')
    localStorage.removeItem('deactivate')
    this.valid=false;
  }

  refreshToken(){
   // this.logout()
    const headers =
    {
      headers:new HttpHeaders({
        "Authorization" : "Basic " + btoa("client:123456")
      })
    };
    console.log('refresh')
    return this.http.post<{access_token:string,refresh_token:string}>(this.url+"/oauth/token?grant_type=refresh_token&refresh_token="+localStorage.getItem('refresh_token'),{},headers).pipe(tap(res =>{
      localStorage.setItem('access_token', res.access_token);
      localStorage.setItem('refresh_token', res.refresh_token);
      localStorage.setItem('expires',""+(Date.now() + 120000));
      this.valid=true;
    }))
  }

  principleProvider(){
      return this.http.get<Provider>(this.url+"/providers/"+localStorage.getItem('cur_user')+"?access_token="+localStorage.getItem('access_token')).pipe(catchError(this.errorHandler));
  }

  principleUser(){
    return this.http.get<User>(this.url+"/users/"+localStorage.getItem('cur_user')+"?access_token="+localStorage.getItem('access_token')).pipe(catchError(this.errorHandler));
}
  loggedIn():boolean{
    return localStorage.getItem('access_token') !== null;
  }

  public validToken(){
    if(!localStorage.getItem('expires') || !localStorage.getItem('access_token') || !localStorage.getItem('refresh_token')){
      console.log("no logged in")
      return null;
    }

    let expires:number =  +localStorage.getItem('expires');
    let now:number = Date.now();
    let difference = now - expires;
    console.log(difference)
    if(difference < -5000){
      return true;
    }
    return false;
  }
  errorHandler(error:HttpErrorResponse){
    return throwError(error.message || "Server error");
  }
}

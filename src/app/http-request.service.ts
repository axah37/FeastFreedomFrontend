import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Item } from './item';
import { AuthenticateService } from './authenticate.service';
import { Hour } from './hour';
import { Provider } from './provider';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  url:string="http://localhost:8080"
  constructor(private http:HttpClient, private _auth:AuthenticateService) { }

  saveProvider(value):Observable<Provider>{
    return this.http.post<Provider>(this.url+"/register/provider",value).pipe(catchError(this.errorHandler));
  }

  addProviderImage(id,image){
    return this.http.post(this.url+"/register/provider/uploadImage/"+id, image).pipe(catchError(this.errorHandler));
  }

  getItems(id):Observable<Item[]>{
    return this.http.get<Item[]>(this.url+"/providers/items/"+id+"?access_token="+localStorage.getItem('access_token')).pipe(catchError(this.errorHandler));
  }

  getHours(id):Observable<Hour[]>{
    return this.http.get<Hour[]>(this.url+"/providers/hours/"+id+"?access_token="+localStorage.getItem('access_token')).pipe(catchError(this.errorHandler));
  }

  editProvider(value){
    return this.http.post(this.url+"/providers/edit?access_token="+localStorage.getItem('access_token'),value).pipe(catchError(this.errorHandler));
  }

  deleteItems(items){
    let params = new HttpParams();
    for (let id of items) {
      params = params.append('itemId', id);
    }
    return this.http.get(this.url+"/providers/deleteItems?access_token="+localStorage.getItem('access_token'),{params}).pipe(catchError(this.errorHandler));
  }
  deleteHours(hours){
    let params = new HttpParams();
    for (let id of hours) {
      params = params.append('hourId', id);
    }
    return this.http.get(this.url+"/providers/deleteHours?access_token="+localStorage.getItem('access_token'),{params}).pipe(catchError(this.errorHandler));
  }
  errorHandler(error:HttpErrorResponse){
    return throwError(error.message || "Server error");
  }

  saveUser(user){
    return this.http.post<Provider>(this.url+"/register/users",user).pipe(catchError(this.errorHandler));
  }

  getAllProviders():Observable<Provider[]>{
    return this.http.get<Provider[]>(this.url+"/users/providers?access_token="+localStorage.getItem('access_token')).pipe(catchError(this.errorHandler));
  }

  getOneProvider(id):Observable<Provider>{
    return this.http.get<Provider>(this.url+"/users/providers/"+id+"?access_token="+localStorage.getItem('access_token')).pipe(catchError(this.errorHandler));
  }

  getProviderItems(id):Observable<Item[]>{
    return this.http.get<Item[]>(this.url+"/users/providers/items/"+id+"?access_token="+localStorage.getItem('access_token')).pipe(catchError(this.errorHandler));
  }

  getProviderHours(id):Observable<Hour[]>{
    return this.http.get<Hour[]>(this.url+"/users/providers/hours/"+id+"?access_token="+localStorage.getItem('access_token')).pipe(catchError(this.errorHandler));
  }
}

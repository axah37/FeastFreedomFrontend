import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeactivateGuardService implements CanDeactivate<any> {

  canDeactivate(): boolean | Observable<boolean>{
    if(localStorage.getItem('deactivate')==='true'){
      localStorage.removeItem('deactivate')
      return true;
    }
    return confirm("Your Information is not save, Continue?")
  }

  constructor() { }
}

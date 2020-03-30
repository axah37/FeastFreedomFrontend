import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticateService } from './authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class ActivateGuardService implements CanActivate{

  constructor(private auth: AuthenticateService, private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(!this.auth.loggedIn() && !route.url[0].toString().startsWith('login')){
      alert('Please Log In. You are redirected to login Page');
      this.router.navigate(["/login"],{ queryParams: { retUrl: route.url} });
    }
    else if(localStorage.getItem('authority')==='ROLE_PROVIDER'){
      if(!route.url[0].toString().startsWith('provider')){
        alert('You do not have access to reach this page. You are redirected to Provider Homepage')
        this.router.navigate(['/provider'])
      }
    }
    else if(localStorage.getItem('authority')==='ROLE_USER'){
      if(!route.url[0].toString().startsWith('users')){
        alert('You do not have access to reach this page. You are redirected to User Homepage')
        this.router.navigate(['/users'])
      }
    }
    return true;
  }
}

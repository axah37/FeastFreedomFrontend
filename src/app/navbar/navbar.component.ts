import { Component, OnInit, Input } from '@angular/core';
import { AuthenticateService } from '../authenticate.service';
import { Router } from '@angular/router';
import { Provider } from '../provider';
import { User } from '../user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appTitle:string = "FeastFreedom.com"
  @Input() user:any;
  provider:Provider;
  users:User;
  constructor(private _authService:AuthenticateService, private _router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    this._authService.logout();
    this._router.navigate(['/']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Provider } from '../provider';
import { User } from '../user';
import { Hour } from '../hour';
import { Item } from '../item';
import { AuthenticateService } from '../authenticate.service';
import { HttpRequestService } from '../http-request.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users-order',
  templateUrl: './users-order.component.html',
  styleUrls: ['./users-order.component.css']
})
export class UsersOrderComponent implements OnInit {

  provider: Provider
  principleUser: User
  hours:Hour[] = []
  items:Item[] = []
  cartItems:Item[] = []
  showCart:boolean = false;
  total:number = 0;
  submitted:boolean=false;
  constructor(private _auth:AuthenticateService, private _http:HttpRequestService, private _router:Router, private _route:ActivatedRoute, private _snackBar:MatSnackBar) { }

  ngOnInit(): void {
    if (this._auth.validToken() !== null && !this._auth.validToken()) {
      this._auth.refreshToken().subscribe(() => {
        this._auth.principleUser().subscribe(
          data => (this.principleUser = data),
          error => console.log(error),
          () => console.log("Got Principle User")
        );
        this._http.getOneProvider(this._route.snapshot.queryParams['providerId']).subscribe(
          (data) => {
            this.provider = data;
          },
          (error) => console.log(error),
          () => console.log("Got Provider")
        );
        this._http.getProviderItems(this._route.snapshot.queryParams['providerId']).subscribe(
          (data) => {
            this.items = data;
          },
          (error) => console.log(error),
          () => console.log("Got Items")
        );
        this._http.getProviderHours(this._route.snapshot.queryParams['providerId']).subscribe(
          (data) => {
            this.hours = data;
          },
          (error) => console.log(error),
          () => console.log("Got Hours")
        );
      })
    } else {
      this._auth.principleUser().subscribe(
        data => (this.principleUser = data),
        error => console.log(error),
        () => console.log("Got Principle User")
      );
      this._http.getOneProvider(this._route.snapshot.queryParams['providerId']).subscribe(
        (data) => {
          this.provider = data;
        },
        (error) => console.log(error),
        () => console.log("Got Provider")
      );
      this._http.getProviderItems(this._route.snapshot.queryParams['providerId']).subscribe(
        (data) => {
          this.items = data;
        },
        (error) => console.log(error),
        () => console.log("Got Items")
      );
      this._http.getProviderHours(this._route.snapshot.queryParams['providerId']).subscribe(
        (data) => {
          this.hours = data;
        },
        (error) => console.log(error),
        () => console.log("Got Hours")
      );
    }
  }

  addToCart(index, value){
    if(value){
      this.cartItems.push(this.items[index])
      this.total += this.items[index].itemPrice
    } else{
      var i = this.cartItems.indexOf(this.items[index])
      this.deleteFromCart(i)
    }
  }

  next(){
    if(this.cartItems.length !== 0 && !this.showCart){
      this.showCart=true;
    }
  }

  cancel(){
    this._router.navigate(['/users'])
  }

  deleteFromCart(i){
    this.total -= this.cartItems[i].itemPrice
    this.cartItems.splice(i,1);
  }

  checkout(){
    if(this.cartItems.length !== 0 && this.showCart){
      let snackBarRef = this._snackBar.open("Order Has Been Placed","Going Home",{duration:1500})
      this.submitted=true;
      snackBarRef.afterDismissed().subscribe(() => this._router.navigate(['/users']))
    }
  }
  onSubmit(form){
    console.log(this.items)
    for(let item of this.items){
      console.log(item)
      console.log(form.value[item.itemName])
    }
  }
}

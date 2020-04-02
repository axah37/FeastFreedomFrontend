import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PlatformLocation } from "@angular/common";
import { Router } from "@angular/router";
import { Hour } from "../hour";
import { NgForm, FormGroup } from "@angular/forms";
import { ProviderItemComponent } from "../provider-item/provider-item.component";
import { Item } from "../item";
import { HttpRequestService } from '../http-request.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticateService } from '../authenticate.service';
import { ThrowStmt } from '@angular/compiler';
import { Provider } from '../provider';
@Component({
  selector: "app-register-provider",
  templateUrl: "./register-provider.component.html",
  styleUrls: ["./register-provider.component.css"]
})
export class RegisterProviderComponent implements OnInit {
  hidden: boolean = false;
  imageURL: string;
  hours: number[];
  days: Hour[];
  items: Item[] = [];
  requiredItem: boolean = true;
  requiredHour: boolean = true;
  submitted:boolean=false;
  provider:Provider;
  file:File;
  constructor(
    public dialog: MatDialog,
    location: PlatformLocation,
    private _router: Router,
    private _http: HttpRequestService,
    private _snackBar: MatSnackBar,
    private _auth: AuthenticateService
  ) {
  }

  ngOnInit(): void {
    this.hours = Array(24)
      .fill(null)
      .map((x, i) => i);
    this.days = [
      new Hour(1, false, 0, 0),
      new Hour(2, false, 0, 0),
      new Hour(3, false, 0, 0),
      new Hour(4, false, 0, 0),
      new Hour(5, false, 0, 0),
      new Hour(6, false, 0, 0),
      new Hour(7, false, 0, 0)
    ];
  }

  cancel() {
        this._router.navigate(["/"])
  }

  next() {
    this.hidden = !this.hidden;
  }

  onFileSelected(event) {
    var reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    };
    reader.readAsDataURL(event.target.files[0]);
    this.file=event.target.files[0];
  }

  onSubmit(form: NgForm) {
    let formData:FormData = new FormData();
    formData.append('imgInput',this.file)
    this.submitted=true;
    let email = form.value.provider.providerEmail;
    let password = form.value.provider.providerPassword;
    localStorage.setItem('deactivate','true')
    let snackbar=this._snackBar.open("Provider Is Registered, You will be redirected to Provider Homepage",null,{duration:1500})
    snackbar.afterDismissed().subscribe(()=>this._router.navigate(["/provider"]))
    this._http.saveProvider(form.value).subscribe(
      (data) => {this.provider=data;},
      (error) => console.log(error),
      () => {
        this._http.addProviderImage(this.provider.providerId, formData).subscribe(
          ()=>console.log("uploadedImage")
        )
        this._auth.getAuthority(email).subscribe(
          () => {
            this._auth.login(email, password).subscribe(
              () => console.log('Logged Provider In')
            )
          }
        )
    }
    );

  }

  openCount() {
    var i = 0;
    for (let day of this.days){
      if (day.open) {
        i++;
        break;
      }
    }
    if(i === 0){this.requiredHour = true;}
    else{this.requiredHour=false;}
  }
  addItem() {
    const dialogReg = this.dialog.open(ProviderItemComponent, {
      width: "250px"
    });

    dialogReg.afterClosed().subscribe(result => {
      if (result) {
        this.items.push(result);
        this.requiredItem = false;
      }
    });
  }

  deleteItem(i: number) {
    this.items.splice(i, 1);
    if (this.items.length === 0) {
      this.requiredItem = true;
    }
  }

  checkForm(form: FormGroup) {
    console.log(form.value);
    return false;
  }
}

import { Component, OnInit, SystemJsNgModuleLoader } from "@angular/core";
import { Item } from "../item";
import { HttpRequestService } from "../http-request.service";
import { AuthenticateService } from "../authenticate.service";
import { Router } from "@angular/router";
import { Provider } from "../provider";
import { MatDialog } from "@angular/material/dialog";
import { ProviderItemComponent } from "../provider-item/provider-item.component";
import { Hour } from "../hour";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: "app-provider-homepage",
  templateUrl: "./provider-homepage.component.html",
  styleUrls: ["./provider-homepage.component.css"]
})
export class ProviderHomepageComponent implements OnInit {
  items: Item[] = [];
  hours: Hour[] = [];
  days: Hour[];
  hoursArray: number[];
  editItems: Item[] = [];
  deleteI: number[] = [];
  deleteH: number[] = [];
  itemAdded: boolean = false;
  submitted: boolean = false;
  imgURI:string = '';
  provider: Provider;
  editing: boolean = false;
  constructor(
    public dialog: MatDialog,
    private _http: HttpRequestService,
    private _auth: AuthenticateService,
    private _router: Router,
    private _snackBar: MatSnackBar,
  ) {localStorage.setItem('deactivate','true')}

  ngOnInit(): void {
    if (this._auth.validToken() !== null && !this._auth.validToken()) {
      this._auth.refreshToken().subscribe(() => {
        this._auth.principleProvider().subscribe(
          data => {
            this.imgURI = 'http://15.222.224.5:8081/static/'+data.providerImg;
            this.provider = data;
            this._http.getItems(this.provider.providerId).subscribe(
              data => (this.items = data),
              error => console.log(error),
              () => console.log("Done fetching items")
            );
            this._http.getHours(this.provider.providerId).subscribe(
              data => (this.hours = data),
              error => console.log(error),
              () => console.log("Done fetching hours")
            );
          },
          error => {
            console.log(error)
                    },
          () => console.log("Fetching Items")
        );
      });
    } else {
      this._auth.principleProvider().subscribe(
        data => {
          console.log(data)
          this.imgURI = 'http://15.222.224.5:8081/'+data.providerImg;
          this.provider = data;
          this._http.getItems(this.provider.providerId).subscribe(
            data => (this.items = data),
            error => console.log(error),
            () => console.log("Done fetching items")
          );
          this._http.getHours(this.provider.providerId).subscribe(
            data => (this.hours = data),
            error => console.log(error),
            () => console.log("Done fetching hours")
          );
        },
        error => {
          console.log(error)
                },
        () => console.log("Fetching Items")
      );
    }
  }

  addItem() {
    const dialogReg = this.dialog.open(ProviderItemComponent, {
      width: "250px"
    });

    dialogReg.afterClosed().subscribe(result => {
      if (result) {
        this.editItems.push(result);
        this.itemAdded = true;
        console.log(this.editItems);
      }
    });
  }

  edit() {
    this.editing = true;
    this.editItems = [];
    this.deleteI = [];
    this.deleteH = [];
    this.hoursArray = Array(24)
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
    for (let hour of this.hours) {
      this.days[hour.dayOfWeek - 1] = hour;
    }
    for (let item of this.items) {
      this.editItems.push(item);
    }
  }

  cancel() {
    this.editing = false;
    this.itemAdded = false;
  }

  deleteItem(i, itemId) {
    this.deleteI.push(itemId);
    this.editItems.splice(i, 1);
    this.itemAdded = true;
  }

  onSubmit(form) {
    this.submitted=true;
    let snackbar = this._snackBar.open("Saving Changed Please Wait",null,{duration:1500})
    if (this.deleteI.length !== 0) {
      this._http.deleteItems(this.deleteI).subscribe(
        data => {
          console.log(data);
        },
        error => console.log(error),
        () => console.log("Finished Deleting Items")
      );
    }
    this.getDeleteHours(form.value.hours);
    if(this.deleteH.length!==0){
      this._http.deleteHours(this.deleteH).subscribe(
        data => {
          console.log(data);
        },
        error => console.log(error),
        () => console.log("Finished Deleting Hours")
      );
    }
    snackbar.afterDismissed().subscribe(() => window.location.reload())
    this._http.editProvider(form.value).subscribe(
      data => {
        console.log(data);
      },
      error => console.log(error),
      () => console.log("Saved Changes")
    );
  }

  getDeleteHours(value) {
    for (let day of this.days) {
      if (day.hourId && !day.open) {
        this.deleteH.push(day.hourId);
        console.log(this.deleteH);
      }
    }
  }
  logout() {
    this._router.navigate(["/"]);
  }
}

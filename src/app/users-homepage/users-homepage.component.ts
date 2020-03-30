import { Component, OnInit } from "@angular/core";
import { HttpRequestService } from "../http-request.service";
import { Provider } from "../provider";
import { AuthenticateService } from "../authenticate.service";
import { User } from "../user";
import { Router } from "@angular/router";

@Component({
  selector: "app-users-homepage",
  templateUrl: "./users-homepage.component.html",
  styleUrls: ["./users-homepage.component.css"]
})
export class UsersHomepageComponent implements OnInit {
  providers: Provider[];
  principleUser: User;
  constructor(
    private _auth: AuthenticateService,
    private _http: HttpRequestService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    if (
      (this._auth.validToken() !== null && !this._auth.validToken()) ||
      !this._auth.valid
    ) {
      this._auth.refreshToken().subscribe(() => {
        this._auth.principleUser().subscribe(
          data => {
            this.principleUser = data
            localStorage.setItem('principleType','user')
          },
          error => {
            this._router.navigate(["/providers"]);
          },
          () => {
            this._http.getAllProviders().subscribe(
              data => (this.providers = data),
              error => console.log(error),
              () => console.log("Fetched Providers")
            );
          }
        );
      });
    } else {
      this._auth.principleUser().subscribe(
        data => {
          this.principleUser = data
          localStorage.setItem('principleType','user')
        },
        error => {
          this._router.navigate(["/providers"]);
        },
        () => {
          this._http.getAllProviders().subscribe(
            data => (this.providers = data),
            error => {
              console.log(error);
              this._auth.valid = false;
              window.location.reload;
            },
            () => console.log("Fetched Providers")
          );
        }
      );
    }
  }

  order(provider) {
    console.log(provider);
    this._router.navigate(["/users/order"], {
      queryParams: { providerId: provider.providerId }
    });
  }
}

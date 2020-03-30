import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AuthenticateService } from "../authenticate.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  error: string = "";
  constructor(private _auth: AuthenticateService, private _router: Router) {}

  ngOnInit(): void {}

  onSubmit(form) {
    this._auth.getAuthority(form.value.username).subscribe(
      data => console.log(localStorage.getItem("authority")),
      error => {
        console.log(error)
        this.error = "Username was not found!";
      },
      () => {
        this._auth.login(form.value.username, form.value.password).subscribe(
          data => console.log(data),
          error => {
            this.error = "Password is Incorrect for this User!";
          },
          () => {
            if(localStorage.getItem("authority") === 'ROLE_PROVIDER'){
              this._router.navigate(["/provider"]);
            }else{
              this._router.navigate(["/users"]);
            }
          }
        )
      }
    )
  }
}

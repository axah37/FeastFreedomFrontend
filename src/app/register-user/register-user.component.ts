import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validator,
  Validators,
  ValidatorFn,
  AbstractControl
} from "@angular/forms";
import { MustMatchDirective } from "../must-match.directive";
import { HttpRequestService } from '../http-request.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticateService } from '../authenticate.service';
@Component({
  selector: "app-register-user",
  templateUrl: "./register-user.component.html",
  styleUrls: ["./register-user.component.css"]
})
export class RegisterUserComponent implements OnInit {

  userForm = this.fb.group({
    userFirstName: ["", Validators.required],
    userLastName: ["", Validators.required],
    userEmail: ["", Validators.required],
    userPassword: ["", [Validators.required, Validators.minLength(6)]],
    confirmedPassword: ["", [Validators.required]],
    userSecurityQuestionOne: ["", [Validators.required]],
    userAnswerOne: ["", [Validators.required]],
    userSecurityQuestionTwo: ["", [Validators.required]],
    userAnswerTwo: ["", [Validators.required]]
  });
  submitted:boolean=false;
  constructor(private fb: FormBuilder, private _http:HttpRequestService, private _router:Router, private _snackBar:MatSnackBar, private _auth:AuthenticateService) {}

  ngOnInit(): void {
    this.userForm.get('confirmedPassword').setValidators(this.match())
  }

  match(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      return control.value !== this.userForm.get("userPassword").value
        ? { matchError: true }
        : null;
    };
  }

  onSubmit(){
    let email=this.userForm.value.userEmail
    let password=this.userForm.value.userPassword
    this.submitted=true;
    let snack = this._snackBar.open('User has been Registered, Redirect to User Homepage',null,{duration:1500})
    snack.afterDismissed().subscribe(
      () => this._router.navigate(['/users'])
      )
    this._http.saveUser(this.userForm.value).subscribe(
      (data) => console.log(data),
      (error) => console.log(error),
      () => {
        this._auth.login(email,password).subscribe(()=>console.log("Logged In User"))
      }
    )
  }

  cancel(){
    this._router.navigate(['/login'])
  }
  get userPassword(){return this.userForm.get("userPassword")}
  get confirmedPassword(){return this.userForm.get("confirmedPassword")}
}

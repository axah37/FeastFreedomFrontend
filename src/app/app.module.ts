import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatSelectModule } from '@angular/material/select'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog'
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatCardModule } from '@angular/material/card'
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { RegisterProviderComponent } from './register-provider/register-provider.component'
import { DeactivateGuardService } from './deactivate-guard.service';
import { DayOfWeekPipe } from './day-of-week.pipe';
import { ProviderItemComponent } from './provider-item/provider-item.component';
import { MustMatchDirective } from './must-match.directive';
import { OpenCloseDirective } from './open-close.directive';
import { HttpRequestService } from './http-request.service';
import { ProviderHomepageComponent } from './provider-homepage/provider-homepage.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UsersHomepageComponent } from './users-homepage/users-homepage.component';
import { UsersOrderComponent } from './users-order/users-order.component';
import { ActivateGuardService } from './activate-guard.service';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterProviderComponent,
    DayOfWeekPipe,
    ProviderItemComponent,
    MustMatchDirective,
    OpenCloseDirective,
    ProviderHomepageComponent,
    RegisterUserComponent,
    UsersHomepageComponent,
    UsersOrderComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatGridListModule,
    MatCheckboxModule,
    MatCardModule,
    MatSnackBarModule,
    HttpClientModule
  ],
  providers: [DeactivateGuardService, HttpRequestService, ActivateGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterProviderComponent } from './register-provider/register-provider.component';
import { DeactivateGuardService } from './deactivate-guard.service';
import { ProviderHomepageComponent } from './provider-homepage/provider-homepage.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { UsersHomepageComponent } from './users-homepage/users-homepage.component';
import { UsersOrderComponent } from './users-order/users-order.component';
import { ActivateGuardService } from './activate-guard.service';


const routes: Routes = [
  {path: '', redirectTo:'/login', pathMatch:'full'},
  {path: 'login', component: LoginComponent, canActivate: [ActivateGuardService]},
  {path: 'register/provider', component: RegisterProviderComponent, canDeactivate: [DeactivateGuardService]},
  {path: 'register/user', component: RegisterUserComponent, canDeactivate: [DeactivateGuardService]},
  {path: 'provider', component:ProviderHomepageComponent, canActivate: [ActivateGuardService], canDeactivate: [DeactivateGuardService]},
  {path: 'users', component:UsersHomepageComponent, canActivate: [ActivateGuardService]},
  {path: 'users/order', component:UsersOrderComponent, canActivate: [ActivateGuardService], canDeactivate: [DeactivateGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

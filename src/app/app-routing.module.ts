import { AuthGuardService } from './services/auth/auth-guard.service';
import { AclResolver } from './app.resolve';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormRegisterComponent } from './form-register/form-register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormOccurenceComponent } from './form-occurence/form-occurence.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: FormRegisterComponent
  },
  {
    path: 'home',
    canActivate: [AuthGuardService],
    component: HomeComponent,
    resolve: { route: AclResolver, state: AclResolver}
  },
  {
    path: 'occurence',
    canActivate: [AuthGuardService],
    component: FormOccurenceComponent,
    resolve: { route: AclResolver, state: AclResolver}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { AclService } from 'ng2-acl/dist';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { AclResolver } from './app.resolve';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormRegisterComponent } from './form-register/form-register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormOccurrenceComponent } from './form-occurrence/form-occurrence.component';
import { ListUserComponent } from './list-user/list-user.component';
import { FormComplaintComponent } from './form-complaint/form-complaint.component';
import { ListOccurrenceComponent } from './list-occurrence/list-occurrence.component';

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
    path: 'occurrence',
    canActivate: [AuthGuardService],
    component: FormOccurrenceComponent,
    resolve: { route: AclResolver, state: AclResolver}
  },
  {
    path: 'list-user',
    component: ListUserComponent,
    resolve: { route: AclResolver, state: AclResolver}
  },
  {
    path: 'form-complaint',
    component: FormComplaintComponent
  },
  {
    path: 'list-occurrence',
    component: ListOccurrenceComponent,
    resolve: { route: AclResolver, state: AclResolver}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ AclService, AclResolver ]
})
export class AppRoutingModule { }

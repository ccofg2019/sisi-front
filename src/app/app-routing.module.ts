import { AclService } from 'ng2-acl/dist';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { AclResolver } from './app.resolve';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENT
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FormRegisterComponent } from './components/form-register/form-register.component';
import { FormFunctionaryComponent } from './components/form-functionary/form-functionary.component';
import { FormOccurrenceComponent } from './components/form-occurrence/form-occurrence.component';
import { FormComplaintComponent } from './components/form-complaint/form-complaint.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { ListOccurrenceComponent } from './components/list-occurrence/list-occurrence.component';
import { ListIrregularitiesComponent} from './components/list-irregularities/list-irregularities.component';
import { ViewOccurrenceComponent } from './components/view-occurrence/view-occurrence.component';

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
    path: 'functionary',
    component: FormFunctionaryComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    resolve: { route: AclResolver, state: AclResolver}
  },
  {
    path: 'occurrence',
    component: FormOccurrenceComponent,
    canActivate: [AuthGuardService],
    resolve: { route: AclResolver, state: AclResolver}
  },
  {
    path: 'view-occurrence/:id',
    component: ViewOccurrenceComponent,
  },
  {
    path: 'list-user',
    component: ListUserComponent,
    canActivate: [AuthGuardService],
    resolve: { route: AclResolver, state: AclResolver}
  },
  {
    path: 'form-complaint',
    component: FormComplaintComponent
  },
  {
    path: 'list-occurrence',
    component: ListOccurrenceComponent,
    canActivate: [AuthGuardService],
    resolve: { route: AclResolver, state: AclResolver}
  },
  {
    path: 'list-irregularities',
    component: ListIrregularitiesComponent,
    // canActivate: [AuthGuardService],
    // resolve: { route: AclResolver, state: AclResolver}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ AclService, AclResolver ]
})
export class AppRoutingModule { }

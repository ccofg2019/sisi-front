import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormRegisterComponent } from './form-register/form-register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormOccurenceComponent } from './form-occurence/form-occurence.component';
import { ListUserComponent } from './list-user/list-user.component';
import { ListOcorrenceComponent } from './list-ocorrence/list-ocorrence.component';
import { FormComplaintComponent } from './form-complaint/form-complaint.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: FormRegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'occurence', component: FormOccurenceComponent },
  { path: 'list-user', component: ListUserComponent },
  { path: 'list-ocorrence', component: ListOcorrenceComponent},
  { path: 'form-complaint', component: FormComplaintComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

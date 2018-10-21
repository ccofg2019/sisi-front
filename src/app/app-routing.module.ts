import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormRegisterComponent } from './form-register/form-register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormOccurrenceComponent } from './form-occurrence/form-occurrence.component';
import { ListUserComponent } from './list-user/list-user.component';
import { ListOccurrenceComponent } from './list-occurrence/list-occurrence.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: FormRegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'occurrence', component: FormOccurrenceComponent },
  { path: 'list-user', component: ListUserComponent },
  { path: 'list-occurrence', component: ListOccurrenceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { AclService } from 'ng2-acl/dist';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { AclResolver } from './app.resolve';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { FormRegisterComponent } from './components/form-register/form-register.component';
import { FormFunctionaryComponent } from './components/form-functionary/form-functionary.component';
import { FormOccurrenceComponent } from './components/form-occurrence/form-occurrence.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { FormIrregularityComponent } from './components/form-irregularity/form-irregularity.component';
import { ListOccurrenceComponent } from './components/list-occurrence/list-occurrence.component';
import { ListIrregularitiesComponent} from './components/list-irregularities/list-irregularities.component';
import { ViewOccurrenceComponent } from './components/view-occurrence/view-occurrence.component';
import { ViewIrregularityComponent } from './components/view-irregularity/view-irregularity.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { PerfilUserComponent } from './components/perfil-user/perfil-user.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';

const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'register', component: FormRegisterComponent},
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuardService],
    resolve: { route: AclResolver, state: AclResolver },
    children: [
      {
        path: 'map', component: MapComponent,
      },
      {
        path: 'functionary', component: FormFunctionaryComponent,
      },
      {
        path: 'occurrence', component: FormOccurrenceComponent,
      },
      {
        path: 'irregularity', component: FormIrregularityComponent,
      },
      {
        path: 'list-user', component: ListUserComponent,
      },
      {
        path: 'list-user', component: ListUserComponent,
      },
      {
        path: 'list-occurrence', component: ListOccurrenceComponent,
      },
      {
        path: 'list-irregularities', component: ListIrregularitiesComponent,
      },
      {
        path: 'charts', component: PieChartComponent,
      },
      {
        path: 'view-occurrence/:id', component: ViewOccurrenceComponent,
      },
      {
        path: 'view-irregularity/:id', component: ViewIrregularityComponent,
      },
      {
        path: 'view-user/:id', component: ViewUserComponent,
      },
      { path: 'perfil', component: PerfilUserComponent}
      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ AclService, AclResolver ]
})
export class AppRoutingModule { }

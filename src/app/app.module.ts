import { AclRedirection } from './app.resolve';
import { AclService } from 'ng2-acl';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { NotifierModule } from 'angular-notifier';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { MapComponent } from './components/map/map.component';
import { FormRegisterComponent } from './components/form-register/form-register.component';
import { HomeComponent } from './components/home/home.component';
import { FormOccurrenceComponent } from './components/form-occurrence/form-occurrence.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { FormIrregularityComponent } from './components/form-irregularity/form-irregularity.component';
import { ListOccurrenceComponent } from './components/list-occurrence/list-occurrence.component';
import { ViewOccurrenceComponent } from './components/view-occurrence/view-occurrence.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { ViewIrregularityComponent } from './components/view-irregularity/view-irregularity.component';
import { ListIrregularitiesComponent } from './components/list-irregularities/list-irregularities.component';
import { MenuHeaderComponent } from './components/menu-header/menu-header.component';
import { FormFunctionaryComponent } from './components/form-functionary/form-functionary.component';
import { PerfilUserComponent } from './components/perfil-user/perfil-user.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';

// Services
import { TokenInterceptor } from './services/token/token.interceptor';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { UserService } from './services/user.service';
import { OccurrenceService } from './services/occurrence.service';
import { IrregularityService } from './services/irregularity.service';
import { AlertService } from './services/alert.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormRegisterComponent,
    LoginComponent,
    HomeComponent,
    MapComponent,
    FormOccurrenceComponent,
    ListUserComponent,
    ListOccurrenceComponent,
    FormIrregularityComponent,
    ListIrregularitiesComponent,
    MenuHeaderComponent,
    ViewOccurrenceComponent,
    FormFunctionaryComponent,
    ViewIrregularityComponent,
    MapComponent,
    ViewUserComponent,
    PerfilUserComponent,
    PieChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    NotifierModule,
    BrowserAnimationsModule,
    CommonModule,
    ChartsModule,
    AgmCoreModule.forRoot({ // Key
      apiKey: 'AIzaSyBeNmjjr1hYj-sHr7QdLbWSXvvuWjjZkiY'
    })
  ],
  providers: [
    AuthGuardService,
    UserService,
    OccurrenceService,
    IrregularityService,
    AclService,
    AclRedirection,
    AlertService,
    ChartsModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

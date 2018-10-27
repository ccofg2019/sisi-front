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


// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FormRegisterComponent } from './components/form-register/form-register.component';
import { HomeComponent } from './components/home/home.component';
import { FormOccurrenceComponent } from './components/form-occurrence/form-occurrence.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { FormComplaintComponent } from './components/form-complaint/form-complaint.component';
import { ListOccurrenceComponent } from './components/list-occurrence/list-occurrence.component';
import { ListIrregularitiesComponent } from './components/list-irregularities/list-irregularities.component';

// Services
import { TokenInterceptor } from './services/token/token.interceptor';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { UserService } from './services/user.service';
import { OccurrenceService } from './services/occurrence.service';
import { AlertService } from './services/alert.service';

// Libraries
import {
  MatButtonModule,
  MatInputModule,
  MatAutocompleteModule
} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormRegisterComponent,
    LoginComponent,
    HomeComponent,
    FormOccurrenceComponent,
    ListUserComponent,
    ListOccurrenceComponent,
    FormComplaintComponent,
    ListIrregularitiesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    NotifierModule,
    BrowserAnimationsModule,
    CommonModule,
    AgmCoreModule.forRoot({ // Key
      apiKey: 'AIzaSyBeNmjjr1hYj-sHr7QdLbWSXvvuWjjZkiY'
    })
  ],
  providers: [
    AuthGuardService,
    UserService,
    AclService,
    AclRedirection,
    OccurrenceService,
    AlertService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

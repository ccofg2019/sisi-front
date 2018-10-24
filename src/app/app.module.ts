import { AclRedirection } from './app.resolve';
import { AclService } from 'ng2-acl';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule} from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import {NotifierModule} from 'angular-notifier';
import { HttpModule } from '@angular/http';
import { from } from 'rxjs';


// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FormRegisterComponent } from './form-register/form-register.component';
import { HomeComponent } from './home/home.component';
import { FormOccurrenceComponent } from './form-occurrence/form-occurrence.component';
import { ListUserComponent } from './list-user/list-user.component';
import { FormComplaintComponent } from './form-complaint/form-complaint.component';
import { ListOccurrenceComponent } from './list-occurrence/list-occurrence.component';
import { JwPaginationComponent } from 'jw-angular-pagination';

// Services
import { TokenInterceptor } from './services/token/token.interceptor';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { UserService } from './services/user.service';
import { OccurrenceService } from './services/occurrence.service';
import { AlertService } from './services/alert.service';

// Libraries
import {
  MatButtonModule,
  MatCardModule,
  MatRadioModule,
  MatInputModule,
  MatIconModule,
  MatTableModule,
  MatOptionModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MAT_DATE_LOCALE,
  MatCheckboxModule,
  MatSelectModule,
  MatTabsModule,
  MatProgressBarModule,
  MatToolbarModule,
  MatExpansionModule,
  MatSidenavModule,
  MatListModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatProgressSpinnerModule
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
    JwPaginationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    MatInputModule,
    MatIconModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTabsModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatTooltipModule,
    MatExpansionModule,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule,
    NotifierModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
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
    { provide: MAT_DATE_LOCALE, useValue: 'pt-br' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

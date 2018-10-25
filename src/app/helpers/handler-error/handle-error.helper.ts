import { NotifyService } from './../../services/notify/notify.service';
import { AuthService } from './../../services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class ErrorsHandlerHelper {

constructor(
  public authService: AuthService,
  public notifyService: NotifyService
  ) {}

  handleError(error: Error | HttpErrorResponse) {
    if (error instanceof HttpErrorResponse) {
      // Server/connection error
      if (!navigator.onLine) {

      } else {
        // Http Error
        if (error.status === 400) {
          this.notifyService.show('400: ', error.message);
        }
        if (error.status === 401) {
          this.notifyService.show('401: ', error.message);
          this.authService.logout();
        }
        if (error.status === 403) {
          this.notifyService.show('403: ', error.message);
        }
        if (error.status === 404) {
          this.notifyService.show('404: ', error.message);
        }
        if (error.status === 422) {
          this.notifyService.show('422: ', error.message);
        }
      }
    } else {
      // Client Error
    }

    console.error('Error: ', error);
    console.log('test');
  }

}

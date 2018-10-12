import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {NotifyService} from '../../services/notify/notify.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class HandlerErrorHelpers {
  private auth: AuthService;


  constructor( private authService: AuthService, private notify: NotifyService) {
    this.auth = this.authService;
  }


  private showObjectMessage(messageObj: any): void {
    _.forEach(messageObj, (message, key) => {
      this.notify.show('warning', message[0]);
    });
  }

  /**
   *
   * @param {HttpErrorResponse} error
   */
  private handleFailed(error: HttpErrorResponse) {
    this.notify.show('error', 'Verifique sua conexão com a internet');
  }


  /**
   *
   * @param {HttpErrorResponse} error
   */
  private handle200(error: HttpErrorResponse) {
    // if (error.message.substring(0, 11) !== 'Server error') {
      const httpResponse: any = error;

      if (typeof httpResponse.body.message === 'object') {
        this.showObjectMessage(httpResponse.body.message);

      } else {
        this.notify.show('warning', httpResponse.body.message);

      }


    // }
  }


  /**
   *
   * @param {HttpErrorResponse} error
   */
  private handle400(error: HttpErrorResponse) {
    this.notify.show('error', 'Não encontrado');
  }


  /**
   *
   * @param {HttpErrorResponse} error
   */
  private handle401(error: HttpErrorResponse) {

    if (this.auth.isLoggedIn()) {
      this.notify.show('error', 'Sessão expirada, realize o login novamente');
      this.auth.logout();

    } else {
      this.notify.show('error', 'Email ou senha inválidas');

    }
  }


  /**
   *
   * @param {HttpErrorResponse} error
   */
  private handle422(error: HttpErrorResponse) {
    this.showObjectMessage(error.error.message);
  }


  /**
   *
   * @param {HttpErrorResponse} error
   */
  private handle500(error: HttpErrorResponse) {
    this.notify.show('error', error.error.message);
  }


  /**
   *
   * @param {HttpErrorResponse} error
   */
  public handle(error: HttpErrorResponse) {
    switch (error.status) {
      case 0:
        this.handleFailed(error);
        return;

      case 200:
        this.handle200(error);
        return;

      case 400:
        this.handle400(error);
        return;

      case 401:
        this.handle401(error);
        return;

      case 422:
        this.handle422(error);
        return;

      case 500:
        this.handle500(error);
        return;
    }
  }


}

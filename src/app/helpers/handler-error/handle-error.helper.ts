import { NotifyService } from './../../services/notify/notify.service';
import { AuthService } from './../../services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';


@Injectable({ providedIn: 'root' })
export class ErrorsHandlerHelper {

constructor(
  public authService: AuthService,
  public notifyService: NotifyService
  ) {}

  private showMessage(objMessage: any): void {
    _.forEach(objMessage, (message) => {
      this.notifyService.show('warning', message[0]);
    });
  }

  // Falha de conexão
  private handleFailure(error: HttpErrorResponse) {
    this.notifyService.show('error', 'Verifique a conexão com a internet e tente novamente.');
  }

  // Servidor não pode processar a requisição
  private handle400(error: HttpErrorResponse) {
    this.notifyService.show('error', 'Houve um erro, tente novamente');
  }

  // Requisição com autenticação não autorizada
  private handle401(error: HttpErrorResponse) {
    if (this.authService.isLoggedIn()) {
      this.notifyService.show('error', 'Sessão expirada, realize o login novamente');
      this.authService.logout();
    } else {
      this.notifyService.show('error', 'E-mail ou senha inválidos');
    }
  }

  // Recurso esperado pelo requisição não foi encontrado
  private handle404(error: HttpErrorResponse) {
    this.notifyService.show('error', 'Página não encontrada');
  }

  // Erros de validação no conteúdo da requisição
  private handle422(error: HttpErrorResponse) {
    this.showMessage(error.error.message);
  }

  // Erro interno do servidor
  private handle500(error: HttpErrorResponse) {
    this.notifyService.show('error', error.error.message);
  }

  public handleError(error: HttpErrorResponse) {
    switch (error.status) {
      case 0:
        this.handleFailure(error);
        return;

      case 400:
        this.handle400(error);
        return;

      case 401:
        this.handle401(error);
        return;

      case 403:
        this.handle404(error);
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

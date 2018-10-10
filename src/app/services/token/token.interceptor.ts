import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { tap, retry } from 'rxjs/operators';
import { HandlerErrorHelpers } from '../../helpers/handle-error/handler-error.helpers';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  protected handlerErrorHelper;

  constructor(public auth: AuthService, private handler: HandlerErrorHelpers) {
    this.handlerErrorHelper = handler;
  }


  private validInterceptorUrl(url: string): boolean {
    return true;
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.validInterceptorUrl(request.url)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}`
        }
      });
    }

    return next.handle(request).pipe(retry(1), tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {

            if (event.body.error) {
              this.handlerErrorHelper.handle(event);
              throw(event);

            }
          }
        },
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            this.handlerErrorHelper.handle(error);

          }
        }
      )
    );
  }
}

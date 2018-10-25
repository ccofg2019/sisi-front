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

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {
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

    return next.handle(request).pipe(retry(1), tap());

  }
}

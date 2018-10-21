import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {getObjectCookie, getCookie, eraseCookie} from '../../app.utils';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import * as _ from 'lodash';
import { NotifyService } from '../notify/notify.service';
import { AclService } from 'ng2-acl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private router: Router,
    private http: HttpClient,
    private notify: NotifyService,
    private aclService: AclService
    ) {}
  /**
   *
   * @param {string} username
   * @returns {Observable<any>}
   */
  private checksBlocked(username: string): Observable<any> {
    // const version = json.version;
    const version = '2.2.2';
    const data = { 'username': username, 'version-front-busca': version };
    const url = `${environment.API_URL}/api/users/checksBlocked`;

    return this.http.post(url, data);

  }


  /**
   *
   * @param {string} user
   */
  private createUserData(user: string): void {

     eraseCookie('auth_user_data');
     document.cookie = `user_data=${user};Max-Age=21600`;
     const user_request = JSON.parse(user);
     const userRole = (user_request.role === 0 || user_request.role === 1 ) ? 'admin' : 'user';
     this.aclService.attachRole(userRole);

  }


  /**
   *
   * @param {string} token
   */
  private createTokenData(token: string): void {

    eraseCookie('auth_token');

    const objToken: any = JSON.parse(token);
    const expires: number = (_.isObject(objToken)) ? objToken.token.expires_in : 21600;

    document.cookie = `auth_token=${token};Max-Age=${expires}`;

  }


  /**
   *
   * @returns {any}
   */
  public getToken(): any {

    const jsonData: any = getObjectCookie('auth_token');

    if (_.isEmpty(jsonData) && !_.isObject(jsonData)) {

      eraseCookie('auth_token');
      this.router.navigate(['']);

    } else {

      return jsonData.token.access_token;

    }

  }


  /**
   *
   * @returns {any}
   */
  public getDataUser(): any {

    const jsonData: any = getObjectCookie('auth_user_data');

    if (_.isEmpty(jsonData) && !_.isObject(jsonData)) {
      this.logout();
    }

    return jsonData;

  }


  /**
   *
   * @returns {boolean}
   */
  public isLoggedIn(): boolean {

    // moment.locale('pt-br');

    const tokenString: string = getCookie('auth_token') || '{}';
    const userString: string = getCookie('auth_user_data') || '{}';

    const token: any = JSON.parse(tokenString);
    const user: any = JSON.parse(userString);

    let result: boolean;

    try {
      if ((token && token.token && token.token.access_token) && (user && user.id)) {

        const timeExpire = moment(parseInt(token.timeLogin, 10)).add(parseInt(token.token.expires_in, 10), 'seconds');
        const isTokenExpired = timeExpire.isBefore(moment());

        result = token.token.access_token != null && !isTokenExpired;
      }

    } catch (error) {
      result = false;
    }

    return result;

  }
  /**
   *
   */
  public logout(): void {

    eraseCookie('auth_token');
    eraseCookie('auth_user_data');
    this.router.navigate(['']);
    window.stop();
    this.aclService.flushRoles();

  }
  /**
   *
   * @returns {Observable<any>}
   */
  public getUserAuthenticated(): Observable<any> {
    return this.http.get(`${environment.API_URL}/api/users`, {});

  }
  public registerNewUser(): Observable<any> {
    return this.http.post(`${environment.API_URL}/api/mobile/users`, {});
  }
  /**
   *
   * @param {string} username
   * @param {string} password
   * @returns {any}
   */
  public loginUser(username: string, password: string): any {

    const grant_type: string = environment.GRANT_TYPE;
    const client_id: any = environment.CLIENT_ID;
    const client_secret: string = environment.CLIENT_SECRET;

    return new Observable((observer) => {

      // this.checksBlocked(username).subscribe(
      //   (checksBlocked) => {

      //     if (checksBlocked.status === 'ativo') {

            this.http.post(`${environment.API_URL}/oauth/token`, {username, password, grant_type, client_id, client_secret}).subscribe(
              ($token) => {

                const token: string = JSON.stringify({ token: $token, timeLogin: new Date().getTime() });
                this.createTokenData(token);

                this.getUserAuthenticated().subscribe(
                  ($user) => {

                    const user = JSON.stringify($user.data);
                    this.createUserData(user);

                    // this.http.get('http://api.ipstack.com/check?access_key=f84e27b0d9f1d1b6626e0304d0eb0e97').subscribe(
                    //   (dataDevice: any) => {
                        observer.next();

                      // },
                      // (err) => {
                      //   observer.error(err.error);

                      // });

                  },
                  (error: any) => {
                    this.logout();
                    observer.error(error.error);

                  });

              },
              (error) => {

                observer.error(error.error);

              });

          // } else if (status === 'inativo') {
          //     this.notify.show('warning', 'Sua conta está bloqueada!');
          //     observer.error();

          // } else {
          //   this.notify.show('error', 'Esta conta não existe!');
          //   observer.error();
          // }
        // },
        // (error) => {
        //   observer.error();
        // }

      // );

    });

  }

  public registerUser(username: string, password: string): any {

    const grant_type: string = environment.GRANT_TYPE;
    const client_id: any = environment.CLIENT_ID;
    const client_secret: string = environment.CLIENT_SECRET;

    return new Observable((observer) => {

      // this.checksBlocked(username).subscribe(
      //   (checksBlocked) => {

      //     if (checksBlocked.status === 'ativo') {

            this.http.post(`${environment.API_URL}/oauth/token`, {username, password, grant_type, client_id, client_secret}).subscribe(
              ($token) => {

                const token: string = JSON.stringify({ token: $token, timeLogin: new Date().getTime() });
                this.createTokenData(token);

                this.registerNewUser().subscribe(
                  ($user) => {

                    const user = JSON.stringify($user.data);
                    this.createUserData(user);

                    // this.http.get('http://api.ipstack.com/check?access_key=f84e27b0d9f1d1b6626e0304d0eb0e97').subscribe(
                    //   (dataDevice: any) => {
                        observer.next();

                      // },
                      // (err) => {
                      //   observer.error(err.error);

                      // });

                  },
                  (error: any) => {
                    this.logout();
                    observer.error(error.error);

                  });

              },
              (error) => {

                observer.error(error.error);

              });

          // } else if (status === 'inativo') {
          //     this.notify.show('warning', 'Sua conta está bloqueada!');
          //     observer.error();

          // } else {
          //   this.notify.show('error', 'Esta conta não existe!');
          //   observer.error();
          // }
        // },
        // (error) => {
        //   observer.error();
        // }

      // );

    });

  }
}

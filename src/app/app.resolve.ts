import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AclService } from 'ng2-acl';
import { Injectable } from '@angular/core';

@Injectable()

export class AclRedirection {

  constructor(
    private router: Router,
  ) {}

  redirectTo(type: string) {
    if (type === 'Unauthorized') {
      this.router.navigate(['']);
    }
  }
}

@Injectable()

export class AclResolver implements Resolve<any> {

  constructor(

    private aclService: AclService,
    private aclRedirection: AclRedirection,

  ) {}

  match(state, path: any): boolean {

    let match = false;

    if (typeof path === 'object') {

      match = path.test(state.url);

    } else {
      match = state.url === path;
    }
    return match;
  }

  matchUrl(state): any {

    let test;

    if (this.match(state, '')) {

      if (this.aclService.can('login')) {
        test = of(true);
      }
    } else if (this.match(state, '/register')) {

      if (this.aclService.can('register')) {

        test = of(true);
      }

    } else if (this.match(state, '/home')) {

      if (this.aclService.can('user_content')) {

         test = of(true);
        }

      } else if (this.match(state, '/occurence')) {

      if (this.aclService.can('user_content')) {

         test = of(true);
        }

      }
    return test;
  }

  resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    if (this.matchUrl(state)) {

      return of(true);

    } else {

      this.aclRedirection.redirectTo('Unauthorized');
    }
  }

}

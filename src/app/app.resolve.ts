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

      if (this.aclService.can('default-content')) {
        test = of(true);
      }
    } else if (this.match(state, '/register')) {

      if (this.aclService.can('default-content')) {

        test = of(true);
      }

    } else if (this.match(state, '/home')) {

      if (this.aclService.can('user_content')) {

         test = of(true);
        }

      } else if (this.match(state, '/occurrence')) {

      if (this.aclService.can('add_occurrence')) {

         test = of(true);
        }

      } else if (this.match(state, '/irregularity')) {

        if (this.aclService.can('add_irregularity')) {

           test = of(true);
          }

        } else if (this.match(state, '/list-user')) {

        if (this.aclService.can('list_user')) {

           test = of(true);
          }

        } else if (this.match(state, '/list-occurrence')) {

          if (this.aclService.can('list_occurrence')) {

             test = of(true);
            }

          } else if (this.match(state, '/list-irregularities')) {

            if (this.aclService.can('list_irregularity')) {

               test = of(true);
              }

            } else if (this.match(state, '/functionary')) {

              if (this.aclService.can('register_functionary')) {

                 test = of(true);
                }

            } else if (this.match(state, '/charts')) {

              if (this.aclService.can('charts')) {

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

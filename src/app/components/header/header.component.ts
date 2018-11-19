import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { AclService } from 'ng2-acl';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  subscription: any;

  constructor(
    public aclService: AclService,
    private authService: AuthService,
    private zone: NgZone
  ) {

  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.subscription = this.authService.getUserAuthenticated()
        .subscribe (
          user => {
            console.log(user.data);
            this.currentUser = user.data;
            this.zone.run(() => {
              this.currentUser = user.data;
            });
          }
        );
    } else {
      return;
    }
  }

  exit() {
    this.authService.logout();
    this.subscription.unsubscribe();
    this.currentUser.name = '';
  }
}

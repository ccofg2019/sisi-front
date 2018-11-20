import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { AclService } from 'ng2-acl';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  name: string;

  constructor(
    public aclService: AclService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    console.log(1);

    if (this.authService.isLoggedIn()) {
     this.currentUser = this.authService.getDataUser();
     this.name = this.currentUser.name;
    }
  }
  exit() {
    this.authService.logout();
    this.currentUser.name = '';
  }
}

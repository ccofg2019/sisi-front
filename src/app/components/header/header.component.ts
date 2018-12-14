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
  role: string;
  department: string;

  constructor(
    public aclService: AclService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
     this.currentUser = this.authService.getDataUser();
     this.name = this.currentUser.name;
     this.role = this.currentUser.role.name;
     this.department = this.currentUser.role.department;
    }
  }
  exit() {
    this.name = '';
    this.role = '';
    this.department = '';
    this.authService.logout();
  }
}

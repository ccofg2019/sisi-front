import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { AclService } from 'ng2-acl';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public aclService: AclService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }
  exit() {
    this.authService.logout();
  }
}

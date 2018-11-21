import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { AclService } from 'ng2-acl';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public isLoggedIn: boolean;

  constructor(
    private router: Router,
    public aclService: AclService,
    private authService: AuthService
    ) { }

  ngOnInit() {

    this.authService.loginSubject.subscribe(boolean => {
      this.isLoggedIn = boolean;
    });

    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }
}

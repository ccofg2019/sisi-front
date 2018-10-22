import { AuthService } from './../services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from './../models/user.model';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  providers: [ UserService ]
})

export class ListUserComponent implements OnInit {

  public users: User[];

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService
    ) { }

    ngOnInit() {
    if (this.authService.isLoggedIn() !== true ) {
      this.router.navigate(['']);
      return;
    }

    this.userService.getUsers().subscribe((response: any) => this.users = response.data);
  }
}

import { User } from './../models/user.model';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AclService } from 'ng2-acl';
import { ListComponent } from '../list.component';
import { ListHelper } from '../helpers/list-component.helper';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  providers: [ UserService ]
})

export class ListUserComponent extends ListHelper implements OnInit, ListComponent {

  public users: User[];

  service = 'UserService';
  methodLoad = 'getUsersPage';
  data = this.users;

  constructor(
    private userService: UserService,
    public aclService: AclService
    ) {
    super();
  }

    ngOnInit() {
    }

}



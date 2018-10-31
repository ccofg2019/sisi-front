import { UserService } from '../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AclService } from 'ng2-acl';
import { ListComponent } from '../../interfaces/list.component';
import { ListPagination } from '../../helpers/list/list-pagination.helper';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  providers: [ UserService ]
})
export class ListUserComponent extends ListPagination
  implements OnInit, ListComponent {
  public service;
  public methodLoad;

  constructor(
    private userService: UserService,
    public aclService: AclService
    ) {
    super();
    this.methodLoad = 'getUsersPage';
    this.service = this.userService;
  }

  ngOnInit() {
    this.loadData();
  }
}

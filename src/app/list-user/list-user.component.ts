import { User, Page, Links } from './../models/user.model';
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
  public page: Page;

  numPage: any;

  

  constructor(private userService: UserService) { }

  ngOnInit() {
    //this.userService.getUsers().subscribe((response: any) => this.users = response.data);
    this.pageUsers(5);
    console.log(this.numPage);
  }

  pageUsers(page){
    this.userService.getUsersPage(page)
    .subscribe((response: any) => {
      this.page = response.pagination
      this.users = response.data; 
      
    } );
  }

}

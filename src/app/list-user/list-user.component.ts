import { User } from './../models/user.model';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  providers:[UserService]
})

export class ListUserComponent implements OnInit {

  public data: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    /*
    this.userService.getAll()
        .then(( data: User[] ) => {
            this.data = data;
            console.log(data);
          })
        .catch(( param: any ) => {
        });
    }
    */

    this.userService.getUsers().subscribe(response => console.log(response));
  }
}

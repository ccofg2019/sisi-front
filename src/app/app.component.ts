import { Component, OnInit } from '@angular/core';
import { AclService } from 'ng2-acl/dist';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sisi-dashboard';
  aclData = {};

  constructor(private aclService: AclService) {}

  ngOnInit() {
      this.aclData = {
          guest: ['login', 'register'],
          user: ['user_content'],
          admin: ['user_content', 'manage_content']
      };
      this.aclService.setAbilities(this.aclData);
      this.aclService.attachRole('guest');
  }

}

import { Component, OnInit } from '@angular/core';
import { AclService } from 'ng2-acl';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss']
})
export class MenuHeaderComponent implements OnInit {

  constructor(
    public aclService: AclService
  ) { }

  ngOnInit() {
  }

}

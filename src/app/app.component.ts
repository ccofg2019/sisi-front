import { Component, OnInit } from '@angular/core';
import { AclService } from 'ng2-acl/dist';
import { ABILITIES } from './acl-const';

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
          guest: [ABILITIES.DEFAULT],
          user: [
            ABILITIES.DEFAULT,
            ABILITIES.USER_CONTENT,
            ABILITIES.ADD_OCCURRENCE
          ],
          inspector: [
            ABILITIES.DEFAULT,
            ABILITIES.USER_CONTENT,
            ABILITIES.ADD_OCCURRENCE,
            ABILITIES.LIST_USER,
            ABILITIES.LIST_OCCURRENCE
          ],
          director: [
            ABILITIES.DEFAULT,
            ABILITIES.USER_CONTENT,
            ABILITIES.ADD_OCCURRENCE,
            ABILITIES.LIST_USER,
            ABILITIES.LIST_OCCURRENCE
          ],
          sec_guard: [
            ABILITIES.DEFAULT,
            ABILITIES.USER_CONTENT,
            ABILITIES.ADD_OCCURRENCE,
            ABILITIES.LIST_USER,
            ABILITIES.LIST_OCCURRENCE
          ],
          inspector2: [
            ABILITIES.DEFAULT,
            ABILITIES.USER_CONTENT,
            ABILITIES.ADD_OCCURRENCE,
            ABILITIES.LIST_USER,
            ABILITIES.LIST_OCCURRENCE
          ],
          gen_inspector: [
            ABILITIES.DEFAULT,
            ABILITIES.USER_CONTENT,
            ABILITIES.ADD_OCCURRENCE,
            ABILITIES.LIST_USER,
            ABILITIES.LIST_OCCURRENCE],
          op_director: [
            ABILITIES.DEFAULT,
            ABILITIES.USER_CONTENT,
            ABILITIES.ADD_OCCURRENCE,
            ABILITIES.LIST_USER,
            ABILITIES.LIST_OCCURRENCE ],
          superintendent: [
            ABILITIES.DEFAULT,
            ABILITIES.USER_CONTENT,
            ABILITIES.ADD_OCCURRENCE,
            ABILITIES.LIST_USER,
            ABILITIES.LIST_OCCURRENCE
          ],
          investigator: [
            ABILITIES.DEFAULT,
            ABILITIES.USER_CONTENT,
            ABILITIES.ADD_OCCURRENCE,
            ABILITIES.LIST_USER,
            ABILITIES.LIST_OCCURRENCE
          ],
          chief_investigator: [
            ABILITIES.DEFAULT,
            ABILITIES.USER_CONTENT,
            ABILITIES.ADD_OCCURRENCE,
            ABILITIES.LIST_USER,
            ABILITIES.LIST_OCCURRENCE
          ],
          superintendent2: [
            ABILITIES.DEFAULT,
            ABILITIES.USER_CONTENT,
            ABILITIES.ADD_OCCURRENCE,
            ABILITIES.LIST_USER,
            ABILITIES.LIST_OCCURRENCE
          ],
      };
      this.aclService.setAbilities(this.aclData);
  }

}

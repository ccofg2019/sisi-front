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
            ABILITIES.ADD_OCCURRENCE,
            ABILITIES.ADD_IRREGULARITY
          ],
          inspector: [
            ABILITIES.DEFAULT,
            ABILITIES.USER_CONTENT,
            ABILITIES.ADD_OCCURRENCE,
            ABILITIES.ADD_IRREGULARITY,
            ABILITIES.LIST_USER,
            ABILITIES.LIST_OCCURRENCE,
            ABILITIES.LIST_IRREGULARITY
          ],
          director: [
            ABILITIES.DEFAULT,
            ABILITIES.USER_CONTENT,
            ABILITIES.ADD_OCCURRENCE,
            ABILITIES.ADD_IRREGULARITY,
            ABILITIES.LIST_USER,
            ABILITIES.LIST_OCCURRENCE,
            ABILITIES.LIST_IRREGULARITY
          ],
          sec_guard: [
            ABILITIES.DEFAULT,
            ABILITIES.USER_CONTENT,
            ABILITIES.ADD_OCCURRENCE,
            ABILITIES.ADD_IRREGULARITY,
            ABILITIES.LIST_USER,
            ABILITIES.LIST_OCCURRENCE,
            ABILITIES.LIST_IRREGULARITY
          ],
          inspector2: [
            ABILITIES.DEFAULT,
            ABILITIES.USER_CONTENT,
            ABILITIES.ADD_OCCURRENCE,
            ABILITIES.ADD_IRREGULARITY,
            ABILITIES.LIST_USER,
            ABILITIES.LIST_OCCURRENCE,
            ABILITIES.LIST_IRREGULARITY
          ],
          gen_inspector: [
            ABILITIES.DEFAULT,
            ABILITIES.USER_CONTENT,
            ABILITIES.ADD_OCCURRENCE,
            ABILITIES.ADD_IRREGULARITY,
            ABILITIES.LIST_USER,
            ABILITIES.LIST_OCCURRENCE,
            ABILITIES.LIST_IRREGULARITY
          ],
          op_director: [
            ABILITIES.DEFAULT,
            ABILITIES.USER_CONTENT,
            ABILITIES.ADD_OCCURRENCE,
            ABILITIES.ADD_IRREGULARITY,
            ABILITIES.LIST_USER,
            ABILITIES.LIST_OCCURRENCE,
            ABILITIES.LIST_IRREGULARITY
          ],
          superintendent: [
            ABILITIES.DEFAULT,
            ABILITIES.USER_CONTENT,
            ABILITIES.ADD_OCCURRENCE,
            ABILITIES.ADD_IRREGULARITY,
            ABILITIES.LIST_USER,
            ABILITIES.LIST_OCCURRENCE,
            ABILITIES.LIST_IRREGULARITY
          ],
          investigator: [
            ABILITIES.DEFAULT,
            ABILITIES.USER_CONTENT,
            ABILITIES.ADD_OCCURRENCE,
            ABILITIES.ADD_IRREGULARITY,
            ABILITIES.LIST_USER,
            ABILITIES.LIST_OCCURRENCE,
            ABILITIES.LIST_IRREGULARITY
          ],
          chief_investigator: [
            ABILITIES.DEFAULT,
            ABILITIES.USER_CONTENT,
            ABILITIES.ADD_OCCURRENCE,
            ABILITIES.ADD_IRREGULARITY,
            ABILITIES.LIST_USER,
            ABILITIES.LIST_OCCURRENCE,
            ABILITIES.LIST_IRREGULARITY
          ],
          superintendent2: [
            ABILITIES.DEFAULT,
            ABILITIES.USER_CONTENT,
            ABILITIES.ADD_OCCURRENCE,
            ABILITIES.ADD_IRREGULARITY,
            ABILITIES.LIST_USER,
            ABILITIES.LIST_OCCURRENCE,
            ABILITIES.LIST_IRREGULARITY
          ],
      };
      this.aclService.setAbilities(this.aclData);
  }

}

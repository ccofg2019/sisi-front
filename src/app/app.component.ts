import { Subject } from 'rxjs';
import { AuthService } from './services/auth/auth.service';
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

  public isLoggedIn: boolean;

  constructor(private aclService: AclService, private authService: AuthService) {}

  ngOnInit() {

      this.aclData = {
          guest: [ABILITIES.DEFAULT],
          user: [
            ABILITIES.DEFAULT,
            ABILITIES.USER_CONTENT,
            ABILITIES.ADD_OCCURRENCE,
            ABILITIES.ADD_IRREGULARITY
          ],
          inspectorDFCU: [
            ABILITIES.DEFAULT,
            ABILITIES.USER_CONTENT,
            ABILITIES.ADD_OCCURRENCE,
            ABILITIES.ADD_IRREGULARITY,
            ABILITIES.LIST_IRREGULARITY
          ],
          directorDFCU: [
            ABILITIES.DEFAULT,
            ABILITIES.USER_CONTENT,
            ABILITIES.ADD_OCCURRENCE,
            ABILITIES.ADD_IRREGULARITY,
            ABILITIES.LIST_IRREGULARITY
          ],
          sec_guard: [
            ABILITIES.DEFAULT,
            ABILITIES.USER_CONTENT,
            ABILITIES.ADD_OCCURRENCE,
            ABILITIES.ADD_IRREGULARITY,
            ABILITIES.LIST_OCCURRENCE,
          ],
          inspector: [
            ABILITIES.DEFAULT,
            ABILITIES.USER_CONTENT,
            ABILITIES.ADD_OCCURRENCE,
            ABILITIES.ADD_IRREGULARITY,
            ABILITIES.LIST_USER,
            ABILITIES.LIST_OCCURRENCE,
          ],
          gen_inspector: [
            ABILITIES.DEFAULT,
            ABILITIES.USER_CONTENT,
            ABILITIES.ADD_OCCURRENCE,
            ABILITIES.ADD_IRREGULARITY,
            ABILITIES.LIST_USER,
            ABILITIES.LIST_OCCURRENCE
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
          monitor: [
            ABILITIES.DEFAULT,
            ABILITIES.USER_CONTENT,
            ABILITIES.ADD_OCCURRENCE,
            ABILITIES.ADD_IRREGULARITY,
            ABILITIES.LIST_USER,
            ABILITIES.LIST_OCCURRENCE,
          ],
          investigator: [
            ABILITIES.DEFAULT,
            ABILITIES.USER_CONTENT,
            ABILITIES.ADD_OCCURRENCE,
            ABILITIES.ADD_IRREGULARITY,
            ABILITIES.LIST_OCCURRENCE
          ],
          chief_investigator: [
            ABILITIES.DEFAULT,
            ABILITIES.USER_CONTENT,
            ABILITIES.ADD_OCCURRENCE,
            ABILITIES.ADD_IRREGULARITY,
            ABILITIES.LIST_USER,
            ABILITIES.LIST_OCCURRENCE,
          ],
          superintendent: [
            ABILITIES.DEFAULT,
            ABILITIES.USER_CONTENT,
            ABILITIES.ADD_OCCURRENCE,
            ABILITIES.ADD_IRREGULARITY,
            ABILITIES.LIST_USER,
            ABILITIES.LIST_OCCURRENCE,
            ABILITIES.LIST_IRREGULARITY,
            ABILITIES.REGISTER_FUNCTIONARY,
            ABILITIES.CHARTS
          ],
      };
      this.aclService.setAbilities(this.aclData);
  }

}

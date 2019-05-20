import { HttpClient } from '@angular/common/http';
import { OccurrenceService } from '../../services/occurrence.service';
import { UserService } from '../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AclService } from 'ng2-acl';
import { ListComponent } from '../../interfaces/list.component';
import { ListPagination } from '../../helpers/list/list-pagination.helper';
import { OccurrenceTypes } from 'src/app/models/occurrenceTypes.models';
import { first } from 'rxjs/operators';
import { NotifyService } from 'src/app/services/notify/notify.service';
import { User } from "./user";

@Component({
  selector: 'app-list-occurrence',
  templateUrl: './list-occurrence.component.html',
  styleUrls: ['./list-occurrence.component.scss'],
  providers: [ OccurrenceService ]
})
export class ListOccurrenceComponent extends ListPagination
  implements OnInit, ListComponent {
  public service;
  public idOccurrence: number;
  public methodLoad;
  public occurrencesType: OccurrenceTypes[];
  public user: User;
  public temPermissaoValidar: boolean;

  constructor(
    private occurrenceService: OccurrenceService,
    private userService: UserService,
    public aclService: AclService,
    private notifier: NotifyService
    ) {
    super();
    this.methodLoad = 'getOccurrencesPage';
    this.service = this.occurrenceService;
    this.userService.getUserInformations().subscribe((response: any) => {this.user = response;
    });

  }

  ngOnInit() {
    this.loadData();
    this.occurrenceService.getOccurrencesType().subscribe((response: any) => this.occurrencesType = response.data);
  }

  validaInvestigator(id: number) {
    this.occurrenceService.statusOccurrences(id, 'EM INVESTIGACAO')
    .pipe(first())
    .subscribe(
      data => {
        this.notifier.show('success', 'Registro de ocorrência está em INVESTIGACAO');
        this.loadData();
      },
      error => {
        this.notifier.show('error', 'Ocorreu um erro ao tentar alterar o status da ocorrência');
      });
  }

  validaPermissao(){
    if(this.user.role_id == 8 
      || this.user.role_id == 9
      || this.user.role_id == 10
      || this.user.role_id == 11) {
      return true;
    }else{
      return false;
    }
  }

  filterOcurrences(id: any[]) {
    return id.filter(occurrence => occurrence.status != 'EM INVESTIGACAO' || (this.user.role_id == 8
                                                                            || this.user.role_id == 9
                                                                            || this.user.role_id == 10
                                                                            || this.user.role_id == 11));
  }

}

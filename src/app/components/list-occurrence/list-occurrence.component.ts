import { OccurrenceService } from '../../services/occurrence.service';
import { Component, OnInit } from '@angular/core';
import { AclService } from 'ng2-acl';
import { ListComponent } from '../../interfaces/list.component';
import { ListPagination } from '../../helpers/list/list-pagination.helper';

@Component({
  selector: 'app-list-occurrence',
  templateUrl: './list-occurrence.component.html',
  styleUrls: ['./list-occurrence.component.scss'],
  providers: [ OccurrenceService ]
})
export class ListOccurrenceComponent extends ListPagination
  implements OnInit, ListComponent {
  public service;
  public methodLoad;

  constructor(
    private occurrenceService: OccurrenceService,
    public aclService: AclService
    ) {
    super();
    this.methodLoad = 'getOccurrencesPage';
    this.service = this.occurrenceService;
  }

  ngOnInit() {
    this.loadData();
  }
}

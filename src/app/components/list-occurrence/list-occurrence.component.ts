import { HttpClient } from '@angular/common/http';
import { OccurrenceService } from '../../services/occurrence.service';
import { Component, OnInit } from '@angular/core';
import { AclService } from 'ng2-acl';
import { ListComponent } from '../../interfaces/list.component';
import { ListPagination } from '../../helpers/list/list-pagination.helper';
import { OccurrenceTypes } from 'src/app/models/occurrenceTypes.models';

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
  public occurrencesType: OccurrenceTypes[];

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
    this.occurrenceService.getOccurrencesType().subscribe((response: any) => this.occurrencesType = response.data);
  }

}

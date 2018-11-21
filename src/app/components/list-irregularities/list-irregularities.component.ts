import { Irregularity } from './../../models/irregularity.model';
import { Component, OnInit } from '@angular/core';
import { AclService } from 'ng2-acl';
import { ListComponent } from '../../interfaces/list.component';
import { ListPagination } from '../../helpers/list/list-pagination.helper';
import { IrregularityService } from './../../services/irregularity.service';
import { IrregularityTypes } from 'src/app/models/irregularityTypes.model';

@Component({
  selector: 'app-list-irregularities',
  templateUrl: './list-irregularities.component.html',
  styleUrls: ['./list-irregularities.component.scss'],
})
export class ListIrregularitiesComponent extends ListPagination
  implements OnInit, ListComponent {
  public service;
  public methodLoad;
  public irregularity: Irregularity;
  public irregularityType: IrregularityTypes[];

  constructor(
    private irregularityService: IrregularityService,
    public aclService: AclService
    ) {
    super();
    this.methodLoad = 'getIrregularitiesPage';
    this.service = this.irregularityService;
  }

  ngOnInit() {
    this.loadData();
    this.irregularityService.getIrregularitiesType().subscribe((response: any) => this.irregularityType = response.data);
  }
}

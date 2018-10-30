import { Component, OnInit } from '@angular/core';
import { AclService } from 'ng2-acl';
import { ListComponent } from '../../interfaces/list.component';
import { ListPagination } from '../../helpers/list/list-pagination.helper';

@Component({
  selector: 'app-list-irregularities',
  templateUrl: './list-irregularities.component.html',
  styleUrls: ['./list-irregularities.component.scss'],
  //providers: [ IrregularitiesService ]
})
export class ListIrregularitiesComponent extends ListPagination
  implements OnInit, ListComponent {
  public service;
  public methodLoad;
    
  constructor(
    
    public aclService: AclService
    ) {
    super();
    this.methodLoad = 'getIrregularitiesPage';
  }

  ngOnInit() {
    this.loadData();
  }
}

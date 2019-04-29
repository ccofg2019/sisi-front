import { Component, OnInit } from '@angular/core';
import { OccurrenceService } from 'src/app/services/occurrence.service';
import { Irregularity } from 'src/app/models/irregularity.model';
import { AclService } from 'ng2-acl';
import { ListComponent } from 'src/app/interfaces/list.component';
import { ListPagination } from 'src/app/helpers/list/list-pagination.helper';
import { IrregularityService } from 'src/app/services/irregularity.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  providers: [ OccurrenceService ]
})
export class PieChartComponent extends ListPagination
  implements OnInit, ListComponent {
  public service;
  public methodLoad;
  public irregularities: Irregularity[];

  public pieChartLabels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto',
                            'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  public pieChartData = [];
  public pieChartType = 'pie';
  
  constructor(
    private irregularityService: IrregularityService,
    public aclService: AclService
    ) {
    super();
    this.methodLoad = 'getOccurrencesPage';
    this.service = this.irregularityService;
  }
  
  ngOnInit() {

    //this.loadData();
    this.irregularityService.irregularitiesChart(2019).subscribe((response: any) => {
      console.log(response['months']);
      this.pieChartData = response['months'].map(res => res.numIrregularity);
    });

  }

}

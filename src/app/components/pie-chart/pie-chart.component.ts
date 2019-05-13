import { Component, OnInit } from '@angular/core';
import { OccurrenceService } from 'src/app/services/occurrence.service';
import { Irregularity } from 'src/app/models/irregularity.model';
import { AclService } from 'ng2-acl';
import { ListComponent } from 'src/app/interfaces/list.component';
import { ListPagination } from 'src/app/helpers/list/list-pagination.helper';
import { IrregularityService } from 'src/app/services/irregularity.service';
import { Occurrence } from 'src/app/models/occurrence.model';
import { OccurrenceFilter } from 'src/app/models/occurrenceFilter.model';
import { FormGroup, FormBuilder} from '@angular/forms';
import { OccurrenceTypes } from 'src/app/models/occurrenceTypes.models';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  providers: [OccurrenceService]
})
export class PieChartComponent extends ListPagination
  implements OnInit, ListComponent {
  public service;
  public serviceOcurrence;
  public methodLoad;
  public irregularities: Irregularity[];
  public occurrence: Occurrence[];

  public pieChartLabels = [];
  public pieChartData = [];
  public pieChartType = 'pie';
  public dataLoaded = false;

  public pieChartLabelsOccurrence = [];
  public pieChartDataOccurrence = [];
  public pieChartTypeOccurrence = 'pie';
  public dataLoadedOccurrence = false;
  public occurrenceFilterForm: FormGroup;

  constructor(
    private irregularityService: IrregularityService,
    private occurrenceService: OccurrenceService,
    public aclService: AclService,
    private formBiulder: FormBuilder
  ) {
    super();
    this.methodLoad = 'getOccurrencesPage';
    this.service = this.irregularityService;
    this.serviceOcurrence = this.occurrenceService;
  }

  ngOnInit() {
    this.irregularityService.irregularitiesChart(2019).subscribe((response: any) => {
      response['months'].map(res => {
        if (res.numIrregularity > 0) {
          this.pieChartLabels.push(res.name);
          this.pieChartData.push(res.numIrregularity);
        }
      });
      this.dataLoaded = true;
    });

    this.formSerialize();
    this.submitFilter();
  }

  submitFilter(){
    const occurrenceFilter: OccurrenceFilter = Object.assign(new OccurrenceFilter(), this.occurrenceFilterForm.value);
    
    this.pieChartLabelsOccurrence = [];
    this.pieChartDataOccurrence = [];

    this.occurrenceService.occurrenceisChartFilter(occurrenceFilter).subscribe((response: any) => {
      response['months'].map(res => {
        if (res.numOccurrence > 0) {
          this.pieChartLabelsOccurrence.push(res.name);
          this.pieChartDataOccurrence.push(res.numOccurrence);
        }
      });
      if( this.pieChartLabelsOccurrence.length == 0 || this.pieChartDataOccurrence.length == 0){
        this.pieChartLabelsOccurrence.push("Não há registos");
        this.pieChartDataOccurrence.push(1);
      }

      this.dataLoadedOccurrence = true;
    });
  }

  private formSerialize(){
    this.occurrenceFilterForm = this.formBiulder.group({
      year: [2019],
      month: [""],
      occurrenceTypesId: [""],
      occurrenceTypes: [""]
    })
  }


}

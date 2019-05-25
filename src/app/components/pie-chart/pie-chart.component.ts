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
import { IrregularityFilter } from 'src/app/models/irregularityFilter.model';

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

  public pieChartLabelsOccurrenceAnual = [];  
  public pieChartDataOccurrenceAnual = [];
  public pieChartTypeOccurrenceAnual = 'pie';

  public pieChartLabelsOccurrenceMensal = [];  
  public pieChartDataOccurrenceMensal = [];
  public pieChartTypeOccurrenceMensal = 'pie';

  public dataLoadedOccurrence = false;
  public occurrenceFilterFormAnual: FormGroup;
  public occurrenceFilterFormMensal: FormGroup;

  public irregularityFilterForm: FormGroup;
  public pieChartLabelsIrregularity = [];
  public pieChartDataIrregularity = [];

  public tipoRelatorio =  'anual';

  constructor(
    private irregularityService: IrregularityService,
    private occurrenceService: OccurrenceService,
    public aclService: AclService,
    private formBiulderAnual: FormBuilder,
    private formBiulderMensal: FormBuilder,
    private formBuilderIrregularity: FormBuilder
  ) {
    super();
    this.methodLoad = 'getOccurrencesPage';
    this.service = this.irregularityService;
    this.serviceOcurrence = this.occurrenceService;
  }

  ngOnInit() {
    this.formSerializeFilterOcurrenceAnual();
    this.formSerializeFilterOcurrenceMensal();
    this.submitFilterOcurrenceAnual();
    this.submitFilterOcurrenceMensal();
    
    this.formSerializeIrregularity();
    this.submitFilterIrregularity();
  }

  submitFilterOcurrenceAnual(){
    const occurrenceFilter: OccurrenceFilter = Object.assign(new OccurrenceFilter(), this.occurrenceFilterFormAnual.value);
    
    this.pieChartLabelsOccurrenceAnual = [];
    this.pieChartDataOccurrenceAnual = [];

    this.occurrenceService.occurrenciesByYear(occurrenceFilter).subscribe((response: any) => {
      response['months'].map(res => {
        if (res.numOccurrence > 0) {
          this.pieChartLabelsOccurrenceAnual.push(res.name);
          this.pieChartDataOccurrenceAnual.push(res.numOccurrence);
        }
      });
      if( this.pieChartLabelsOccurrenceAnual.length == 0 || this.pieChartDataOccurrenceAnual.length == 0){
        this.pieChartLabelsOccurrenceAnual.push("Não há registos");
        this.pieChartDataOccurrenceAnual.push(1);
      }

      this.dataLoadedOccurrence = true;
    });
  }

  submitFilterOcurrenceMensal(){
    const occurrenceFilter: OccurrenceFilter = Object.assign(new OccurrenceFilter(), this.occurrenceFilterFormMensal.value);
    
    this.pieChartLabelsOccurrenceMensal = [];
    this.pieChartDataOccurrenceMensal = [];

    this.occurrenceService.occurrenceisChartFilter(occurrenceFilter).subscribe((response: any) => {
      response['months'].map(res => {
        if (res.numOccurrence > 0) {
          this.pieChartLabelsOccurrenceMensal.push(res.name);
          this.pieChartDataOccurrenceMensal.push(res.numOccurrence);
        }
      });
      if( this.pieChartLabelsOccurrenceMensal.length == 0 || this.pieChartDataOccurrenceMensal.length == 0){
        this.pieChartLabelsOccurrenceMensal.push("Não há registos");
        this.pieChartDataOccurrenceMensal.push(1);
      }
    });
  }

  submitFilterIrregularity(){
    const irregularityFilter: IrregularityFilter = Object.assign(new IrregularityFilter(), this.irregularityFilterForm.value);
    
    this.pieChartLabels = [];
    this.pieChartData = [];

    this.irregularityService.irregularitiesChartFilter(irregularityFilter).subscribe((response: any) => {
      response['months'].map(res => {
        if (res.numIrregularity > 0) {
          this.pieChartLabels.push(res.name);
          this.pieChartData.push(res.numIrregularity);
        }
      });
      if( this.pieChartLabels.length == 0 || this.pieChartData.length == 0){
        this.pieChartLabels.push("Não há registos");
        this.pieChartData.push(1);
      }

      this.dataLoaded = true;
    });
  }

  private formSerializeFilterOcurrenceAnual(){
    this.occurrenceFilterFormAnual = this.formBiulderAnual.group({
      year: [2019]
    })
  }

  private formSerializeFilterOcurrenceMensal(){
    this.occurrenceFilterFormMensal = this.formBiulderMensal.group({
      year: [2019],
      month: [""]
    })
  }

  private formSerializeIrregularity(){
    this.irregularityFilterForm = this.formBuilderIrregularity.group({
      year: [2019],
      month: [""],
      irregularityTypesId: [""],
      irregularityTypes: [""]
    })
  }


}

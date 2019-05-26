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
import { OccurrenceByPeriod } from 'src/app/models/occurrenceByPeriod.model';
import { OccurrenceByPeriod2 } from 'src/app/models/occurrenceByPeriod2.model';
import {IrregularityByPeriod } from 'src/app/models/irregularityByPeriod.model';
import {IrregularityByPeriod2 } from 'src/app/models/irregularityByPeriod2.model'
import { IrregularityMonthYear } from 'src/app/models/irregularityMonthYearFilter.model';

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

  public occurrenceByPeriodChartLabels = [];
  public occurrenceByPeriodChartDataSet = [];
  public occurrenceByPeriodChartType = 'bar';
  public occurrenceByPeriodChartDataLoaded = false;
  public occurrenceByPeriodChartDataLoaded2 = false;

  public irregularityByPeriodChartLabels = [];
  public irregularityByPeriodChartDataSet = [];
  public irregularityByPeriodChartType = 'bar';
  public irregularityByPeriodChartDataLoaded = false;
  public irregularityByPeriodChartDataLoaded2 = false;

  public irregularityMonthYearLabels = [];
  public irregularityMonthYearData = [];
  public irregularityMonthYearType = 'pie';
  public irregularityMonthYearDataLoaded = false;

  public pieChartLabelsOccurrence = [];
  public pieChartDataOccurrence = [];
  public pieChartTypeOccurrence = 'pie';
  public dataLoadedOccurrence = false;
  public occurrenceFilterForm: FormGroup;
  public irregularityFilterForm: FormGroup;
  public occurrenceByPeriodFilterForm: FormGroup;
  public occurrenceByPeriod2FilterForm: FormGroup;
  public irregularityByPeriodFilterForm: FormGroup;
  public irregularityByPeriod2FilterForm: FormGroup;
  public irregularityMonthYearForm: FormGroup;
  public pieChartLabelsIrregularity = [];
  public pieChartDataIrregularity = [];

  constructor(
    private irregularityService: IrregularityService,
    private occurrenceService: OccurrenceService,
    public aclService: AclService,
    private formBiulder: FormBuilder,
    private formBuilderIrregularity: FormBuilder,
    private formBuilderOccurrencecByPeriod: FormBuilder,
    private formBuilderOccurrencecByPeriod2: FormBuilder,
    private formBuilderIrregularityByPeriod: FormBuilder,
    private formBuilderIrregularityByPeriod2: FormBuilder,
    private formIrregularityMonthYear: FormBuilder
  ) {
    super();
    this.methodLoad = 'getOccurrencesPage';
    this.service = this.irregularityService;
    this.serviceOcurrence = this.occurrenceService;
  }

  ngOnInit() {
    // this.irregularityService.irregularitiesChart(2019).subscribe((response: any) => {
    //   response['months'].map(res => {
    //     if (res.numIrregularity > 0) {
    //       this.pieChartLabels.push(res.name);
    //       this.pieChartData.push(res.numIrregularity);
    //     }
    //   });
    //   this.dataLoaded = true;
    // });

    this.formSerialize();
    this.formSerializeIrregularity();
    this.formSerializeIrregularityMonthYear();
    this.submitFilter();
    this.submitFilterIrregularity();
    this.formSerializeOccurrenceByPeriod();
    this.submitFilterOccurrenceByPeriod();
    this.formSerializeIrregularityByPeriod();
    this.submitFilterIrregularityByPeriod();
    this.submitFilterIrregularityMonthYear();
  }

  submitFilterIrregularityMonthYear() {
    const irregularityMonthYearFilter: IrregularityMonthYear = Object.assign(new IrregularityMonthYear(), this.irregularityMonthYearForm.value);
    
    this.irregularityMonthYearLabels = [];
    this.irregularityMonthYearData = [];

    this.irregularityService.irregularitiesMonthYearFilter(irregularityMonthYearFilter).subscribe((response: any) => {
      response.map(res => {
        if (res.numberOfIrregularitys > 0) {
          this.irregularityMonthYearLabels.push(res.nameTypeIrregularity);
          this.irregularityMonthYearData.push(res.numberOfIrregularitys);
        }
      });
      if( this.irregularityMonthYearLabels.length == 0 || this.irregularityMonthYearData.length == 0){
        this.irregularityMonthYearLabels.push("Não há registos");
        this.irregularityMonthYearData.push(1);
      }

      this.irregularityMonthYearDataLoaded = true;
    });
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

  submitFilterOccurrenceByPeriod(){
    const occurrenceByPeriod: OccurrenceByPeriod = Object.assign(new OccurrenceByPeriod(), this.occurrenceByPeriodFilterForm.value);
    
    let totalCount: number = 0;
    let totalCount2: number = 0;
    let anyArray: any[] = [];
    
    this.occurrenceByPeriodChartLabels = [];
    this.occurrenceByPeriodChartDataSet = [];
    
    this.occurrenceService.countOccurrenceOfEachType(occurrenceByPeriod).subscribe((response: any) => {
      response.map(res => {
        totalCount = totalCount + res.numberOfOccurrences;
      });
      
      if(anyArray.length <= 0){
        anyArray = [{data: [totalCount], label: 'Perído 1'}];
      }else{
        anyArray.push({data: [totalCount], label: 'Perído 1'});
        
        this.occurrenceByPeriodChartDataSet = anyArray;
    
        this.occurrenceByPeriodChartLabels = ['Períodos'];
      }
      this.occurrenceByPeriodChartDataLoaded = true;
    });

    const occurrenceByPeriod2: OccurrenceByPeriod2 = Object.assign(new OccurrenceByPeriod2(), this.occurrenceByPeriodFilterForm.value);
    this.occurrenceService.countOccurrenceOfEachType2(occurrenceByPeriod2).subscribe((response: any) => {
      response.map(res => {
        totalCount2 = totalCount2 + res.numberOfOccurrences;
      });

      if(anyArray.length <= 0){
        anyArray = [{data: [totalCount2], label: 'Perído 2'}];
      }else{
        anyArray.push({data: [totalCount2], label: 'Perído 2'});
        
        this.occurrenceByPeriodChartDataSet = anyArray;
    
        this.occurrenceByPeriodChartLabels = ['Períodos'];
      }
      this.occurrenceByPeriodChartDataLoaded2 = true;
    });
  }

  submitFilterIrregularityByPeriod(){
    const irregularityByPeriod: IrregularityByPeriod = Object.assign(new IrregularityByPeriod(), this.irregularityByPeriodFilterForm.value);
    
    let totalCount: number = 0;
    let totalCount2: number = 0;
    let anyArray: any[] = [];
    
    this.irregularityByPeriodChartLabels = [];
    this.irregularityByPeriodChartDataSet = [];
    
    this.irregularityService.countIrregularityOfEachType(irregularityByPeriod).subscribe((response: any) => {
      response.map(res => {
        totalCount = totalCount + res.numberOfIrregularitys;
      });
      
      if(anyArray.length <= 0){
        anyArray = [{data: [totalCount], label: 'Perído 1'}];
      }else{
        anyArray.push({data: [totalCount], label: 'Perído 1'});
        
        this.irregularityByPeriodChartDataSet = anyArray;
    
        this.irregularityByPeriodChartLabels = ['Períodos'];
      }
      this.irregularityByPeriodChartDataLoaded = true;
    });

    const irregularityByPeriod2: IrregularityByPeriod2 = Object.assign(new IrregularityByPeriod2(), this.irregularityByPeriodFilterForm.value);
    this.irregularityService.countIrregularityOfEachType2(irregularityByPeriod2).subscribe((response: any) => {
      response.map(res => {
        totalCount2 = totalCount2 + res.numberOfIrregularitys;
      });

      if(anyArray.length <= 0){
        anyArray = [{data: [totalCount2], label: 'Perído 2'}];
      }else{
        anyArray.push({data: [totalCount2], label: 'Perído 2'});
        
        this.irregularityByPeriodChartDataSet = anyArray;
    
        this.irregularityByPeriodChartLabels = ['Períodos'];
      }
      
      this.irregularityByPeriodChartDataLoaded2 = true;
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

  private formSerializeIrregularity(){
    this.irregularityFilterForm = this.formBuilderIrregularity.group({
      year: [2019],
      month: [""],
      irregularityTypesId: [""],
      irregularityTypes: [""]
    })
  }

  private formSerializeOccurrenceByPeriod(){
    this.occurrenceByPeriodFilterForm = this.formBuilderOccurrencecByPeriod.group({
      date_start: ['2019-01-01'],
      date_end: ['2020-01-01'],
      date_start2: ['2020-01-02'],
      date_end2: ['2021-01-01']
    })
  }

  private formSerializeIrregularityByPeriod(){
    this.irregularityByPeriodFilterForm = this.formBuilderIrregularityByPeriod.group({
      date_start: ['2019-01-01'],
      date_end: ['2020-01-01'],
      date_start2: ['2020-01-02'],
      date_end2: ['2021-01-01']
    })
  }

  private formSerializeIrregularityMonthYear(){
    this.irregularityMonthYearForm = this.formIrregularityMonthYear.group({
      year: [2019],
      month: [1]
    })
  }
}

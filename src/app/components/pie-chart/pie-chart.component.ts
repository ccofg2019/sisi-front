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
import { IrregularityFilter } from 'src/app/models/irregularityFilter.model';
import { OccurrenceByPeriod } from 'src/app/models/occurrenceByPeriod.model';
import { OccurrenceByPeriod2 } from 'src/app/models/occurrenceByPeriod2.model';
import {IrregularityByPeriod } from 'src/app/models/irregularityByPeriod.model';
import {IrregularityByPeriod2 } from 'src/app/models/irregularityByPeriod2.model'
import { IrregularityMonthYear } from 'src/app/models/irregularityMonthYearFilter.model';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ChartType, ChartOptions } from 'chart.js';

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
  public pieChartPlugins = [pluginDataLabels];

  public pieChartOptions:any = {
    responsive: true,
    legend: {
      position: 'left',
      labels: {
        fontSize: 16
      }
    }
  };

  public barChartOptions:any = {
    responsive: true,
    legend: {
      position: 'left',
      labels: {
        fontSize: 16
      }
    }
  };

  public backgroundColors: Array<any> = [
    {
      backgroundColor: ["#FF6384", "#f4e002", "#FFCE56", "#E7E9ED", 
                        "#36A2EB", "#coffee", "#6FC8CE", "#ff7f00",
                        "#18720c", "#1ffc02", "#ff0000", "#bc69ef", "#472160"]
    }
  ];
  
  public pieChartOptionsAnualIrregularidades:ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
      labels: {
        fontSize: 16
      }
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          var result = 0;
          if (this.totalAnualIrregularidades > 0) {
            var result = (100 * (value / this.totalAnualIrregularidades));
            return parseFloat(result.toFixed(1)) + "%";
          } 
        },
        color: 'black'
      },
    }
  };

  public pieChartOptionsAnualOcorrencias:any = {
    responsive: true,
    legend: {
      position: 'left',
      labels: {
        fontSize: 16
      }
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          var result = 0;
          
          if (this.totalAnualOcorrencias > 0) {
            var result = (100 * (value / this.totalAnualOcorrencias));
            return parseFloat(result.toFixed(1)) + "%";
          } 
        },
        color: 'black'
      },
    }
  };  

  public pieChartOptionsMensalIrregularidades:any = {
    responsive: true,
    legend: {
      position: 'left',
      labels: {
        fontSize: 16
      }
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          var result = 0;
          
          if (this.totalMensalIrregularidades > 0) {
            var result = (100 * (value / this.totalMensalIrregularidades));
            return parseFloat(result.toFixed(1)) + "%";
          } 
          
        },
        color: 'black'
      },
    }
  };

  public pieChartOptionsMensalOcorrencias:any = {
    responsive: true,
    legend: {
      position: 'left',
      labels: {
        fontSize: 16
      }
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          var result = 0;
          
          if (this.totalMensalOcorrencias > 0) {
            var result = (100 * (value / this.totalMensalOcorrencias));
            return parseFloat(result.toFixed(1)) + "%";
          }
        },
        color: 'black'
      },
    }
  };

  public pieChartLabelsOccurrenceAnual = [];  
  public pieChartDataOccurrenceAnual = [];
  public pieChartTypeOccurrenceAnual = 'pie';

  public pieChartLabelsOccurrenceMensal = [];  
  public pieChartDataOccurrenceMensal = [];
  public pieChartTypeOccurrenceMensal = 'pie';

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
  public occurrenceFilterFormAnual: FormGroup;
  public occurrenceFilterFormMensal: FormGroup;

  public irregularityFilterForm: FormGroup;
  public occurrenceByPeriodFilterForm: FormGroup;
  public occurrenceByPeriod2FilterForm: FormGroup;
  public irregularityByPeriodFilterForm: FormGroup;
  public irregularityByPeriod2FilterForm: FormGroup;
  public irregularityMonthYearForm: FormGroup;
  public pieChartLabelsIrregularity = [];
  public pieChartDataIrregularity = [];

  public totalAnualIrregularidades = 0;
  public totalAnualOcorrencias = 0;
  public totalMensalIrregularidades = 0;
  public totalMensalOcorrencias = 0;

  public tipoRelatorio =  'anual';

  constructor(
    private irregularityService: IrregularityService,
    private occurrenceService: OccurrenceService,
    public aclService: AclService,
    private formBiulderAnual: FormBuilder,
    private formBiulderMensal: FormBuilder,
    private formBuilderIrregularity: FormBuilder,
    private formBiulder: FormBuilder,
   // private formBuilderIrregularity: FormBuilder,
    private formBuilderOccurrencecByPeriod: FormBuilder,
    private formBuilderIrregularityByPeriod: FormBuilder,
    private formIrregularityMonthYear: FormBuilder
  ) {
    super();
    this.methodLoad = 'getOccurrencesPage';
    this.service = this.irregularityService;
    this.serviceOcurrence = this.occurrenceService;
  }

  ngOnInit() {
    this.formSerializeFilterOcurrenceAnual();
    this.formSerializeFilterOcurrenceMensal();
    this.formSerializeIrregularityMonthYear();
    this.formSerializeOccurrenceByPeriod();
    this.formSerializeIrregularity();
    this.formSerializeIrregularityByPeriod();

    this.submitFilterOcurrenceAnual();
    this.submitFilterOcurrenceMensal();
    
    //this.submitFilter();
    this.submitFilterIrregularity();
    this.submitFilterOccurrenceByPeriod();
    this.submitFilterIrregularityByPeriod();
    this.submitFilterIrregularityMonthYear();
  }

  submitFilterIrregularityMonthYear() {
    const irregularityMonthYearFilter: IrregularityMonthYear = Object.assign(new IrregularityMonthYear(), this.irregularityMonthYearForm.value);
    
    this.irregularityMonthYearLabels = [];
    this.irregularityMonthYearData = [];
    this.totalMensalIrregularidades = 0;
    this.irregularityService.irregularitiesMonthYearFilter(irregularityMonthYearFilter).subscribe((response: any) => {
      response.map(res => {
        if (res.numberOfIrregularitys > 0) {
          this.irregularityMonthYearLabels.push(res.nameTypeIrregularity);
          this.irregularityMonthYearData.push(res.numberOfIrregularitys);
          this.totalMensalIrregularidades += res.numberOfIrregularitys;
        }
      });
      if( this.irregularityMonthYearLabels.length == 0 || this.irregularityMonthYearData.length == 0){
        this.irregularityMonthYearLabels.push("Não há registos");
        this.irregularityMonthYearData.push(1);
      }

      this.irregularityMonthYearDataLoaded = true;
    });
  }

  submitFilterOcurrenceAnual(){
    const occurrenceFilter: OccurrenceFilter = Object.assign(new OccurrenceFilter(), this.occurrenceFilterFormAnual.value);
    
    this.pieChartLabelsOccurrenceAnual = [];
    this.pieChartDataOccurrenceAnual = [];
    this.totalAnualOcorrencias = 0;
    this.occurrenceService.occurrenciesByYear(occurrenceFilter).subscribe((response: any) => {
      response['months'].map(res => {
        if (res.numOccurrence > 0) {
          this.pieChartLabelsOccurrenceAnual.push(res.name);
          this.pieChartDataOccurrenceAnual.push(res.numOccurrence);
          this.totalAnualOcorrencias += res.numOccurrence;
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
    this.totalMensalOcorrencias = 0;
    this.occurrenceService.occurrenceisChartFilter(occurrenceFilter).subscribe((response: any) => {
      response.map(res => {
        if (res.numberOfOccurrences > 0) {
          this.pieChartLabelsOccurrenceMensal.push(res.nameTypeOccurrence);
          this.pieChartDataOccurrenceMensal.push(res.numberOfOccurrences);
          this.totalMensalOcorrencias += res.numberOfOccurrences;
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
    this.totalAnualIrregularidades = 0;
    this.irregularityService.irregularitiesChartFilter(irregularityFilter).subscribe((response: any) => {
      response['months'].map(res => {
        if (res.numIrregularity > 0) {
          this.pieChartLabels.push(res.name);
          this.pieChartData.push(res.numIrregularity);
          this.totalAnualIrregularidades += res.numIrregularity;
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
      year: [2019],
      month: [""],
      occurrenceTypesId: [""]
    })
  }

  submitFilterOccurrenceByPeriod(){
    const occurrenceByPeriod: OccurrenceByPeriod = Object.assign(new OccurrenceByPeriod(), this.occurrenceByPeriodFilterForm.value);
    let anyArray: any[] = [];
    
    this.occurrenceByPeriodChartLabels = [];
    this.occurrenceByPeriodChartDataSet = [];
    
    this.occurrenceService.countOccurrenceOfEachType(occurrenceByPeriod).subscribe((response: any) => {
      if(anyArray.length <= 0){
        anyArray = [{data: [response.numberOfOccurrences], label: 'Perído 1'}];
      }else{
        anyArray.push({data: [response.numberOfOccurrences], label: 'Perído 1'});
        
        this.occurrenceByPeriodChartDataSet = anyArray;
    
        this.occurrenceByPeriodChartLabels = ['Períodos'];
      }
      this.occurrenceByPeriodChartDataLoaded = true;
    });

    const occurrenceByPeriod2: OccurrenceByPeriod2 = Object.assign(new OccurrenceByPeriod2(), this.occurrenceByPeriodFilterForm.value);
    this.occurrenceService.countOccurrenceOfEachType2(occurrenceByPeriod2, occurrenceByPeriod).subscribe((response: any) => {
      if(anyArray.length <= 0){
        anyArray = [{data: [response.numberOfOccurrences], label: 'Perído 2'}];
      }else{
        anyArray.push({data: [response.numberOfOccurrences], label: 'Perído 2'});
        
        this.occurrenceByPeriodChartDataSet = anyArray;
    
        this.occurrenceByPeriodChartLabels = ['Períodos'];
      }
      this.occurrenceByPeriodChartDataLoaded2 = true;
    });
  }

  submitFilterIrregularityByPeriod(){
    const irregularityByPeriod: IrregularityByPeriod = Object.assign(new IrregularityByPeriod(), this.irregularityByPeriodFilterForm.value);
    let anyArray: any[] = [];
    
    this.irregularityByPeriodChartLabels = [];
    this.irregularityByPeriodChartDataSet = [];
    
    this.irregularityService.countIrregularityOfEachType(irregularityByPeriod).subscribe((response: any) => {      
      if(anyArray.length <= 0){
        anyArray = [{data: [response.numberOfIrregularitys], label: 'Perído 1'}];
      }else{
        anyArray.push({data: [response.numberOfIrregularitys], label: 'Perído 1'});
        
        this.irregularityByPeriodChartDataSet = anyArray;
    
        this.irregularityByPeriodChartLabels = ['Períodos'];
      }
      this.irregularityByPeriodChartDataLoaded = true;
    });

    const irregularityByPeriod2: IrregularityByPeriod2 = Object.assign(new IrregularityByPeriod2(), this.irregularityByPeriodFilterForm.value);
    this.irregularityService.countIrregularityOfEachType2(irregularityByPeriod2, irregularityByPeriod).subscribe((response: any) => {
      if(anyArray.length <= 0){
        anyArray = [{data: [response.numberOfIrregularitys], label: 'Perído 2'}];
      }else{
        anyArray.push({data: [response.numberOfIrregularitys], label: 'Perído 2'});
        
        this.irregularityByPeriodChartDataSet = anyArray;
    
        this.irregularityByPeriodChartLabels = ['Períodos'];
      }
      this.irregularityByPeriodChartDataLoaded2 = true;
    });
  }


  private formSerializeFilterOcurrenceMensal(){
    this.occurrenceFilterFormMensal = this.formBiulderMensal.group({
      year: [2019],
      month: ["5"]
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
      occurrenceTypes: "1",
      date_start: ['2019-01-01'],
      date_end: ['2020-01-01'],
      date_start2: ['2020-01-02'],
      date_end2: ['2021-01-01']
    })
  }

  private formSerializeIrregularityByPeriod(){
    this.irregularityByPeriodFilterForm = this.formBuilderIrregularityByPeriod.group({
      irregularityTypes: "1",
      date_start: ['2019-01-01'],
      date_end: ['2020-01-01'],
      date_start2: ['2020-01-02'],
      date_end2: ['2021-01-01']
    })
  }

  private formSerializeIrregularityMonthYear(){
    this.irregularityMonthYearForm = this.formIrregularityMonthYear.group({
      year: [2019],
      month: [5]
    })
  }
}

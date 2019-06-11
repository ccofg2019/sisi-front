import { Paginator } from './../models/paginator.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Occurrence } from '../models/occurrence.model';
import { OccurrenceTypes } from '../models/occurrenceTypes.models';
import { OccurrenceByPeriod } from '../models/occurrenceByPeriod.model';
import { OccurrenceByPeriod2 } from '../models/occurrenceByPeriod2.model';
import { Observable, from } from 'rxjs';
import { retry, map } from 'rxjs/operators';
import { OccurrenceFilter } from '../models/occurrenceFilter.model';
import { OccurrenceCoordinates } from '../components/map/occurrence.coordinates';
import { OccurrenceType } from '../components/form-occurrence/occurrencetype.model';

@Injectable()
export class OccurrenceService {
    constructor(private http: HttpClient) { }

    public registerOccurrence(occurrence: Occurrence) {
        return this.http.post(`${environment.API_URL}/api/occurrence-reports`, occurrence);
    }
    public getOccurrences() {
        return this.http.get(`${environment.API_URL}/api/occurrence-reports`);
    }

    public getOccurrencesType() {
        return this.http.get(`${environment.API_URL}/api/occurrence-types`);
    }

    public getOccurrencesID(id: number) {
        return this.http.get(`${environment.API_URL}/api/occurrence-reports/${id}`);
    }

    public getOccurrencesPage(paginator: Paginator) {
        return this.http.get(`${environment.API_URL}/api/occurrence-reports?page=${paginator.current_page}`);
    }

    public statusOccurrences(id: number, status: string) {
        return this.http.put(`${environment.API_URL}/api/occurrence-reports/${id}?status=${status}`, status);
    }

    public editarOccurrences(occurrence: Occurrence, id: number) {
        return this.http.put(`${environment.API_URL}/api/occurrence-reports/${id}`, occurrence);
    }
    public getZones() {
        return this.http.get(`${environment.API_URL}/api/zones?limit=9999`);
    }

    public occurrenciesByYear(occurrenceFilter: OccurrenceFilter){
        if (occurrenceFilter.occurrenceTypesId == null) {
            if (occurrenceFilter.year == null) {
                occurrenceFilter.year = 2019;
            }

            return this.http.get(`${environment.API_URL}/api/occurrence-reports/getAllOfTheYear?year=${occurrenceFilter.year}`);
        }
       else if (occurrenceFilter.occurrenceTypesId != null) {
            console.log(occurrenceFilter.occurrenceTypesId);
            if (occurrenceFilter.year == null) {
                occurrenceFilter.year = 2019;
            }
            return this.http.get(`${environment.API_URL}/api/occurrence-reports/getAllOfTheYear?year=${occurrenceFilter.year}&idOccurrenceType=${occurrenceFilter.occurrenceTypesId}`);
        }

    }

    public occurrenceisChartFilter(occurrenceFilter: OccurrenceFilter) {       
         if (occurrenceFilter.month != null) {
             if (occurrenceFilter.year == null) {
                 occurrenceFilter.year = 2019;
             }

             return this.http.get(`${environment.API_URL}/api/occurrence-reports/countAllOccurrenceOfMonthOfTheYear?year=${occurrenceFilter.year}&month=${occurrenceFilter.month}`);
        
        }
    }
    public listOccurrenceOfAYearAgo(){
        return this.http.get<OccurrenceCoordinates>(`${environment.API_URL}/api/occurrence-reports/listOccurrenceOfAYearAgo`)
    }

    public countOccurrenceOfEachType(occurrenceByPeriod: OccurrenceByPeriod){
        return this.http.get(`${environment.API_URL}/api/occurrence-reports/countOccurrenceOfOneType?occurrence_id=${occurrenceByPeriod.occurrenceTypes}&date_start=${occurrenceByPeriod.date_start}&date_end=${occurrenceByPeriod.date_end}`)
    }

    public countOccurrenceOfEachType2( occurrenceByPeriod2: OccurrenceByPeriod2, occurrenceTypeId: OccurrenceByPeriod){
        return this.http.get(`${environment.API_URL}/api/occurrence-reports/countOccurrenceOfOneType?occurrence_id=${occurrenceTypeId.occurrenceTypes}&date_start=${occurrenceByPeriod2.date_start2}&date_end=${occurrenceByPeriod2.date_end2}`)
    }

    public listAllOccurrenceType(){
        return this.http.get<OccurrenceType[]>(`${environment.API_URL}/api/occurrence-types/listAll`)
    }
}

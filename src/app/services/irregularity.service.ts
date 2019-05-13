import { Paginator } from './../models/paginator.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Irregularity } from '../models/irregularity.model';

@Injectable()
export class IrregularityService {
    constructor(private http: HttpClient) { }

    registerIrregularity(irregularity: Irregularity) {
        return this.http.post(`${environment.API_URL}/api/irregularity-reports`, irregularity);
    }
    public getIrregularities() {
        return this.http.get(`${environment.API_URL}/api/irregularity-reports`);
    }

    public getIrregularitiesType() {
        return this.http.get(`${environment.API_URL}/api/irregularity-types`);
    }

    public getIrregularitiesPage(paginator: Paginator) {
      return this.http.get(`${environment.API_URL}/api/irregularity-reports?page=${paginator.current_page}`);
    }

    public getIrregularitiesID(id: number) {
        return this.http.get(`${environment.API_URL}/api/irregularity-reports/${id}`);
    }

    public statusOccurrences(id: number, status: string) {
        return this.http.put(`${environment.API_URL}/api/irregularity-reports/${id}?status=${status}`, status);
    }

    public editarIrregularities(irregularity: Irregularity, id: number) {
        return this.http.put(`${environment.API_URL}/api/irregularity-reports/${id}`, irregularity);
    }

    public irregularitiesChart(year: number) {
        return this.http.get(`${environment.API_URL}/api/irregularity-reports/getAllOfTheYear?year=2019`);
    }
}

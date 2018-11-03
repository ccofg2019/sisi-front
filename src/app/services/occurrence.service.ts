import { Paginator } from './../models/paginator.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Occurrence } from '../models/occurrence.model';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

@Injectable()
export class OccurrenceService {
    constructor(private http: HttpClient) { }

    registerOccurrence(occurrence: Occurrence) {
        return this.http.post(`${environment.API_URL}/api/occurrence-reports`, occurrence);
    }
    public getOccurrences() {
        return this.http.get(`${environment.API_URL}/api/occurrence-reports`);
    }

    public getOccurrencesID(id: number) {
        return this.http.get(`${environment.API_URL}/api/occurrence-reports/${id}`);
    }

    public getOccurrencesPage(paginator: Paginator) {
      return this.http.get(`${environment.API_URL}/api/occurrence-reports?page=${paginator.current_page}`);
    }

    // alterando todos os campos de um form
    // public putOccurrences(id: number, occurrence: Occurrence) {
    //     return this.http.put(`${environment.API_URL}/api/occurrence-reports/${id}`, occurrence);
    // }

    public statusOccurrences(id: number, status: string) {
       return this.http.put(`${environment.API_URL}/api/occurrence-reports/${id}?status=${status}`, status);
    }

    public editarOccurrences(occurrence: Occurrence, id: number) {
        return this.http.put(`${environment.API_URL}/api/occurrence-reports/${id}`, occurrence);
    }

}

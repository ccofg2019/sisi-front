import { Paginator } from './../models/paginator.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Occurrence } from '../models/occurrence.model';

@Injectable()
export class OccurrenceService {
    constructor(private http: HttpClient) { }

    registerOccurrence(occurrence: Occurrence) {
        return this.http.post(`${environment.API_URL}/api/occurrence-reports`, occurrence);
    }
    public getOccurrences() {
        return this.http.get(`${environment.API_URL}/api/occurrence-reports`);
    }

    public getOccurrencesPage(paginator: Paginator) {
      return this.http.get(`${environment.API_URL}/api/occurrence-reports?page=${paginator.current_page}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Occurrence } from '../models/occurrence';

@Injectable()
export class OccurrenceService {
    constructor(private http: HttpClient) { }

    registerOccurrence(occurrence: Occurrence) {
        return this.http.post(`${environment.API_URL}/api/occurrence-reports`, occurrence);
    }
    getOccurrences() {
        return this.http.get(`${environment.API_URL}/api/occurrence-reports`);
    }
}

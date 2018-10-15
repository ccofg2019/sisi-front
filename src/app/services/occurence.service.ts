import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Occurence } from '../models/occurence';

@Injectable()
export class OccurenceService {
    constructor(private http: HttpClient) { }

    registerOccurence(occurence: Occurence) {
        return this.http.post(`${environment.API_URL}/api/occurrence-reports`, occurence);
    }
}
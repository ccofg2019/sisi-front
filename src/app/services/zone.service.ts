import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Zone } from '../models/zone.model';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class ZoneService {

  constructor(private http: HttpClient) { }

  public listAllZonesRecife(){
    return this.http.get<Zone[]>(`${environment.API_URL}/api/zones/listZonesRecife`);
  }
}

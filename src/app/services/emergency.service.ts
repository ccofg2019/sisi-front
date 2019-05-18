import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Emergency } from '../components/emergency_map/Emergency';

@Injectable()
export class EmergencyService {

  constructor(private http: HttpClient) { }

  public listEmergenciesAttention(){
    return this.http.get<Emergency[]>(`${environment.API_URL}/api/emergency/listEmergenciesAttention`);
  }
}
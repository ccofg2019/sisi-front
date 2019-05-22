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

  public attendEmergency(emergency_id){
    var dataBuild: Object = {
      emergency_id: emergency_id,
      status: 'ATENDENDO'
    };
    return this.changeStatusEmergency(dataBuild);
  }

  public finishEmergency(emergency_id){
    var dataBuild: Object = {
      emergency_id: emergency_id,
      status: 'FINALIZADO'
    };
    return this.changeStatusEmergency(dataBuild);
  }

  private changeStatusEmergency(data: any){
    var dataBody: Object = {
      emergency_id: data.emergency_id,
      status: data.status
    };
    return this.http.post(`${environment.API_URL}/api/emergency/changeStatus`, dataBody);
  }
}
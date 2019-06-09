import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { AclService } from 'ng2-acl';
import { EmergencyService } from 'src/app/services/emergency.service';
import { PositionEmergencies } from './position_emergencies';
import { Emergency } from './Emergency';
import { MarkerMap } from './MarkerMap';

@Component({
  selector: 'app-emergency_map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class EmergencyMapComponent implements OnInit, OnDestroy {  
  lat:number  = -8.05225025;
  lng:number  = -34.9450490084884;
  zoom:number = 17;
  locationChosen = false;
  private infoWindowOpened = null
  private previous_info_window = null
  private emergency: Emergency[] = [];
  public markers: MarkerMap[] = [];
  private safe: string = "./assets/images/safe.png";
  private caution: string = "./assets/images/caution.png";
  private police: string = "./assets/images/police.png";
  private audio = new Audio("./assets/sounds/SoundPolice.mpeg");
  public varInterval: any;
  private timeDelayRequest: number = 5000;

  onChoseLocation(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChosen = true;
  }

  constructor(
    private router: Router,
    public aclService: AclService,
    private authService: AuthService,
    public emergencyService : EmergencyService
    ) {
      this.doRequestAndMarkerMap(false);
    }

    ngOnInit(): void {
      this.varInterval = setInterval(()=>{
        this.doRequestAndMarkerMap(true);
      }, this.timeDelayRequest);
      
    }

    ngOnDestroy(): void {
      clearInterval(this.varInterval);
      this.audio.pause();
    }

    private doRequestAndMarkerMap(clearMap: boolean){
      if(clearMap){
        this.emergency = [];
        this.markers = [];
        this.infoWindowOpened = null;
        this.previous_info_window = null;
      }
      this.emergencyService.listEmergenciesAttention().subscribe(Response => {
        this.emergency = Response;
        this.playSound();
        this.defineLoadingMap(this.emergency);
      });
    }

    defineLoadingMap(emergency: Emergency[]){
      for(let i = 0; i < emergency.length; i++){
        let lastPosition: number = emergency[i].position_emergencies.length - 1;        
        let position_emergencie: PositionEmergencies = emergency[i].position_emergencies[lastPosition];        
        
        var marker: MarkerMap = new MarkerMap();
        marker.emergencyId = emergency[i].id;
        marker.latitude = position_emergencie.latitude;
        marker.longitude = position_emergencie.longitude;

        if(emergency[i].status == "PERIGO"){
          marker.iconUrl = this.caution;
          marker.animation = "BOUNCE"
          marker.infoWindow.FormAttendIsHidden = false;
          marker.infoWindow.FormFinishIsHidden = true;
        }else if(emergency[i].status == "ALERTA"){
          marker.iconUrl = this.safe;
          marker.animation = "";
          marker.infoWindow.FormAttendIsHidden = true;
          marker.infoWindow.FormFinishIsHidden = false;
        }else{
          marker.iconUrl = this.police;
          marker.animation = "";
          marker.infoWindow.FormAttendIsHidden = true;
          marker.infoWindow.FormFinishIsHidden = false;
        }
        
        marker.infoWindow.user = emergency[i].user;

        this.markers.push(marker);
      }
    }

    playSound(){
      if(this.notExistCaution() == false){
        this.audio.loop = true;
        this.audio.play();
      }else{
        this.audio.pause();
      }
    }

    notExistCaution(){
      for(let i = 0; i < this.emergency.length; i++){
        if(this.emergency[i].status == "PERIGO"){
          var lastPositionEmergency = this.emergency[i].position_emergencies.length;
          return false;
        }
      }
      return true;
    }

    close_window(){
      if (this.previous_info_window != null ) 
      {
        this.previous_info_window.close();
      }    
    }

    select_marker(infoWindow){
    if (this.previous_info_window == null)
    {
      this.previous_info_window = infoWindow;
    }      
    else
    {
      this.infoWindowOpened = infoWindow;
      this.previous_info_window.close();
    }
    this.previous_info_window = infoWindow
    }

    attendEmergency(form_attend){
      var emergency_id = form_attend.emergency_id.value;
      this.emergencyService.attendEmergency(emergency_id).subscribe(
        data =>{});
      this.close_window();
    }

    finishEmergency(form_finish){
      var emergency_id = form_finish.emergency_id.value;
      this.emergencyService.finishEmergency(emergency_id).subscribe(
        data =>{});
      this.close_window();
    }

    public changeCoordinateToRecife(){
      this.lat = -8.0516464;
      this.lng = -34.9532446;
    }

    public changeCoordinateToCaruaru(){
      this.lat = -8.2248809;
      this.lng = -35.9825639;
    }

    public changeCoordinateToVitoria(){
      this.lat = -8.1164625;
      this.lng = -35.2983545;
    }
}
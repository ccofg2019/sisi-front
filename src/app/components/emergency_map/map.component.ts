import { Component, OnInit, OnDestroy } from '@angular/core';
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
  
  lat  = -8.05225025;
  lng  = -34.9450490084884;
  locationChosen = false;
  private emergency: Emergency[] = [];
  public markers: MarkerMap[] = [];
  private safe: string = "./assets/images/safe.png";
  private caution: string = "./assets/images/caution.png";
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
        console.log(this.varInterval);
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
      }
      this.emergencyService.listEmergenciesAttention().subscribe(Response => {
        this.emergency = Response;
        this.playSound();
        this.setterPositions(this.emergency);
      });
    }

    setterPositions(emergency: Emergency[]){
      for(let i = 0; i < emergency.length; i++){
        let lastPosition: number = emergency[i].position_emergencies.length - 1;        
        let position_emergencie: PositionEmergencies = emergency[i].position_emergencies[lastPosition];        
        
        var marker: MarkerMap = new MarkerMap();
        marker.latitude = position_emergencie.latitude;
        marker.longitude = position_emergencie.longitude;

        if(emergency[i].status == "PERIGO"){
          marker.iconUrl = this.caution;
          marker.animation = "BOUNCE"
        }else{
          marker.iconUrl = this.safe;
          marker.animation = ""
        }

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
          return false;
        }
      }
      return true;
    }
}
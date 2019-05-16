import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { AclService } from 'ng2-acl';
import { OccurrenceService } from 'src/app/services/occurrence.service';
import { OccurrenceCoordinates } from './occurrence.coordinates';
import { Coordinate } from './coordinate';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  
  lat  = -8.05225025;
  lng  = -34.9450490084884;
  locationChosen = false;
  private occurrenceReport: OccurrenceCoordinates;
  private positions: Coordinate[] = [];

  onChoseLocation(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChosen = true;
  }

  constructor(
    private router: Router,
    public aclService: AclService,
    private authService: AuthService,
    private ocurrenceService: OccurrenceService
    ) { 
      this.ocurrenceService.listOccurrenceOfAYearAgo().subscribe(Response => {
        this.occurrenceReport = Response;      
        this.setterPositions(this.occurrenceReport);
      });
    }

  setterPositions(occurrenceReport: any){
    for(let i = 0; i < occurrenceReport.data.length; i++){
      var LatLng: any[] = occurrenceReport.data[i].coordinates.split(',');
      let _coordinate: Coordinate = new Coordinate();
      _coordinate.latitude = LatLng[0];
      _coordinate.longitude = LatLng[1];
      this.positions.push(_coordinate);
    }
  }
}

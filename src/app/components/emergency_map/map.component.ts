import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { AclService } from 'ng2-acl';
import { Coordinate } from './coordinate';

@Component({
  selector: 'app-emergency_map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class EmergencyMapComponent {
  
  lat  = -8.05225025;
  lng  = -34.9450490084884;
  locationChosen = false;
  private positions: Coordinate[] = [];

  onChoseLocation(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChosen = true;
  }

  constructor(
    private router: Router,
    public aclService: AclService,
    private authService: AuthService
    ) { 

    }
}

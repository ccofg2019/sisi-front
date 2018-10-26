import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-complaint',
  templateUrl: './form-complaint.component.html',
  styleUrls: ['./form-complaint.component.scss']
})
export class FormComplaintComponent implements OnInit {
  lat = -8.05225025;
  lng = -34.9450490084884;
  locationChosen = false;

  onChoseLocation(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChosen = true;
  }

  constructor() {}

  ngOnInit() {}
}

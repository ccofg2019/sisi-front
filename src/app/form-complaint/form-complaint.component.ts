import { Component, OnInit } from '@angular/core';


declare let L;

@Component({
  selector: 'app-form-complaint',
  templateUrl: './form-complaint.component.html',
  styleUrls: ['./form-complaint.component.scss']
})
export class FormComplaintComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const map = L.map('map').setView([-8.05225025, -34.9450490084884], 17);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  }
  exit() {
    confirm('Tem certeza que deseja sair?');
}

}


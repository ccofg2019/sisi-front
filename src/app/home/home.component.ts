import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from './../services/auth/auth.service';

declare let L;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit() {
    if (this.authService.isLoggedIn() !== true ) {
      this.router.navigate(['']);
      return;
    }

    const map = L.map('map').setView([-8.05225025, -34.9450490084884], 17);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  }
  exit() {
    this.authService.logout();
  }

}

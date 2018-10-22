import { OccurrenceService } from './../services/occurrence.service';
import { Occurrence } from './../models/occurrence';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-occurrence',
  templateUrl: './list-occurrence.component.html',
  styleUrls: ['./list-occurrence.component.scss'],
  providers: [ OccurrenceService ]
})
export class ListOccurrenceComponent implements OnInit {

  public occurrences: Occurrence[];

  constructor(
    private occurrenceService: OccurrenceService,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit() {
    if (this.authService.isLoggedIn() !== true ) {
      this.router.navigate(['']);
      return;
    }

    this.occurrenceService.getOccurrences().subscribe((response: any) => this.occurrences = response.data);
  }

}

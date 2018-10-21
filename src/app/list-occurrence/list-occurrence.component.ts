import { OccurrenceService } from './../services/occurrence.service';
import { Occurrence } from './../models/occurrence';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-occurrence',
  templateUrl: './list-occurrence.component.html',
  styleUrls: ['./list-occurrence.component.scss'],
  providers: [ OccurrenceService ]
})
export class ListOccurrenceComponent implements OnInit {

  public occurrences: Occurrence[];

  constructor(private occurrenceService: OccurrenceService) { }

  ngOnInit() {
    this.occurrenceService.getOccurrences().subscribe((response: any) => this.occurrences = response.data);
  }

}

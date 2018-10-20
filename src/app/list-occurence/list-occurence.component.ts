import { OccurenceService } from './../services/occurence.service';
import { Occurence } from './../models/occurence';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-occurence',
  templateUrl: './list-occurence.component.html',
  styleUrls: ['./list-occurence.component.scss'],
  providers: [ OccurenceService ]
})
export class ListOccurenceComponent implements OnInit {

  public occurences: Occurence[];

  constructor(private occurenceService: OccurenceService) { }

  ngOnInit() {
    this.occurenceService.getOccurences().subscribe(response => this.occurences = response.data);
  }

}

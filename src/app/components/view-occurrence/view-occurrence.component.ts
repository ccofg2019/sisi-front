import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AclService } from 'ng2-acl';
import { OccurrenceService } from '../../services/occurrence.service';
import { Occurrence } from '../../models/occurrence.model';

@Component({
  selector: 'app-view-occurrence',
  templateUrl: './view-occurrence.component.html',
  styleUrls: ['./view-occurrence.component.scss'],
  providers: [ OccurrenceService ]
})
export class ViewOccurrenceComponent implements OnInit {

  public occurrence: Occurrence;
  id: number;
  public status = { 'loading': true};

  constructor(
    private route: ActivatedRoute,
    private occurrenceService: OccurrenceService,
    public aclService: AclService
    ) {}

    noDisable2() {
     this.status = { 'loading': false};
    }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.occurrenceService.getOccurrencesID(params.id)
        .subscribe( (occurrence: any) => {
          this.occurrence = occurrence.data;
        });
      }
    );
  }
}

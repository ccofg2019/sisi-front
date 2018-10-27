import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AclService } from 'ng2-acl';
import { OccurrenceService } from '../../services/occurrence.service';
import { Occurrence } from '../../models/occurrence.model';
import { first } from 'rxjs/operators';
import { NotifyService } from '../../services/notify/notify.service';

@Component({
  selector: 'app-view-occurrence',
  templateUrl: './view-occurrence.component.html',
  styleUrls: ['./view-occurrence.component.scss'],
  providers: [ OccurrenceService ]
})
export class ViewOccurrenceComponent implements OnInit {

  public occurrence: Occurrence;
  public status = { 'loading': true};
  public idOccurrence: number;

  constructor(
    private route: ActivatedRoute,
    private occurrenceService: OccurrenceService,
    public aclService: AclService,
    private notifier: NotifyService

    ) {}

    noDisable2() {
     this.status = { 'loading': false};
    }

    arquivarInvestigator() {
      this.occurrenceService.statusOccurrences(this.idOccurrence, 'ARQUIVADA')
      .pipe(first())
      .subscribe(
          data => {
            this.notifier.show('success', 'Registro de ocorrência foi ARQUIVADO');
          },
          error => {
            this.notifier.show('error', 'Ocorreu um erro ao tentar alterar o status da ocorrência');
          });
    }

    validaInvestigator() {
      this.occurrenceService.statusOccurrences(this.idOccurrence, 'EM INVESTIGACAO')
      .pipe(first())
      .subscribe(
        data => {
          this.notifier.show('success', 'Registro de ocorrência está em INVESTIGACAO');
        },
        error => {
          this.notifier.show('error', 'Ocorreu um erro ao tentar alterar o status da ocorrência');
        });
    }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.occurrenceService.getOccurrencesID(params.id)
        .subscribe( (occurrence: any) => {
          this.occurrence = occurrence.data;
          this.idOccurrence = occurrence.data.id;
          console.log(this.idOccurrence);
        });
      }
    );
  }
}


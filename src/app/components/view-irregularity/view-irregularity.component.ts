import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { IrregularityService } from 'src/app/services/irregularity.service';
import { AclService } from 'ng2-acl';
import { NotifyService } from 'src/app/services/notify/notify.service';
import { first } from 'rxjs/operators';
import { Irregularity } from 'src/app/models/irregularity.model';

@Component({
  selector: 'app-view-irregularity',
  templateUrl: './view-irregularity.component.html',
  styleUrls: ['./view-irregularity.component.scss']
})
export class ViewIrregularityComponent implements OnInit {

  public irregularities: Irregularity;
  public idIrregularities: number;
  formIrregularity: FormGroup;
  loading = false;
  submitted = false;

  // Validator patterns
  titlePattern = '^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9,.!?*"#%(); -]{6,32}$';
  storyPattern = '^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9,.!?*"#%(); -]{12,256}$';

  lat  = -8.05225025;
  lng  = -34.9450490084884;
  locationChosen = false;

  onChoseLocation(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChosen = true;
  }

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private irregularityService: IrregularityService,
    public aclService: AclService,
    private notifier: NotifyService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.irregularityService.getIrregularitiesID(params.id)
        .subscribe( (irregularities: any) => {
          this.irregularities = irregularities.data;
          this.idIrregularities = irregularities.data.id;
          this.formIrregularity = this.formBuilder.group({
            title: [irregularities.data.title, [ Validators.required, Validators.pattern(this.titlePattern)]],
            story: [irregularities.data.story, [Validators.required, Validators.pattern(this.storyPattern)]],
            coordinates: '41.40338, 2.17403',
            irregularity_type_id: [irregularities.data.irregularity_type.id, Validators.required],
            zone_id: [irregularities.data.zone.id, Validators.required],
          });

        });
      }
    );

  }

  get f() { return this.formIrregularity.controls; }

  onSubmit() {
    this.submitted = true;

        // stop here if form is invalid
        if (this.formIrregularity.invalid) {
          this.notifier.show('warning', 'Erro ao tentar modificar, confira se os campos foram preenchidos corretamente.');
          return;
        }

        this.loading = true;
        this.irregularityService.editarIrregularities(this.formIrregularity.value, this.idIrregularities)
            .pipe(first())
            .subscribe(
                data => {
                  this.notifier.show('success', 'Irregularidade modificada com sucesso!');
                  this.router.navigate(['home']);
                },
                error => {
                  this.loading = false;
                  this.notifier.show('error', 'Ocorreu um erro ao tentar midificar sua irregularidade.');
                });
  }

  arquivarInvestigator() {
    this.irregularityService.statusOccurrences(this.idIrregularities, 'ARQUIVADA')
    .pipe(first())
    .subscribe(
        data => {
          this.notifier.show('success', 'Irregularidade ARQUIVADA');
        },
        error => {
          this.notifier.show('error', 'Ocorreu um erro ao tentar alterar o status da irregularidade');
        });
  }

  validaInvestigator() {
    this.irregularityService.statusOccurrences(this.idIrregularities, 'EM INVESTIGACAO')
    .pipe(first())
    .subscribe(
      data => {
        this.notifier.show('success', 'Irregularidade está em INVESTIGACAO');
      },
      error => {
        this.notifier.show('error', 'Ocorreu um erro ao tentar alterar o status da irregularidade');
      });
  }

}

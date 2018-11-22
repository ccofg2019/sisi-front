import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { IrregularityService } from '../../services/irregularity.service';
import { OccurrenceService } from './../../services/occurrence.service';
import { AclService } from 'ng2-acl';
import { NotifyService } from './../../services/notify/notify.service';
import { Zone } from './../../models/zone.model';

@Component({
  selector: 'app-form-irregularity',
  templateUrl: './form-irregularity.component.html',
  styleUrls: ['./form-irregularity.component.scss']
})
export class FormIrregularityComponent implements OnInit {

  formIrregularity: FormGroup;
  loading = false;
  submitted = false;
  public zones: Zone[];

  // Validator patterns
  titlePattern = '^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9,.!?*"#%(); -]{6,32}$';
  storyPattern = '^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9,.!?*"#%(); -]{12,256}$';

  lat  = -8.05225025;
  lng  = -34.9450490084884;
  locationChosen = true;

  // Two Way Databind - passando as cordenadas para o form.
  cord;

  onChoseLocation(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChosen = true;
    this.cord = this.lat.toFixed(5) + ',' + this.lng.toFixed(5); // convertendo para string e concatenando cordenadas do mapa
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private irregularityService: IrregularityService,
    private occurrenceService: OccurrenceService,
    private notifier: NotifyService,
    public aclService: AclService,

  ) { }



  ngOnInit() {

    this.occurrenceService.getZones().subscribe((response: any) => this.zones = response.data);

    // Definindo valor default para o mapa
    if (this.cord === undefined) {
      this.cord = '-8.05241,-34.94523';
    }

    this.formIrregularity = this.formBuilder.group({
      title: ['', [ Validators.required, Validators.pattern(this.titlePattern)]],
      story: ['', [Validators.required, Validators.pattern(this.storyPattern)]],
      coordinates: [this.cord, Validators.required],
      irregularity_type_id: ['', Validators.required],
      zone_id: ['', Validators.required],
    });
  }

  get f() { return this.formIrregularity.controls; }

  onSubmit() {
    this.submitted = true;

        // stop here if form is invalid
        if (this.formIrregularity.invalid) {
          this.notifier.show('warning', 'Erro ao tentar registrar, confira se os campos foram preenchidos corretamente.');
          return;
        }

        this.loading = true;
        this.irregularityService.registerIrregularity(this.formIrregularity.value)
            .pipe(first())
            .subscribe(
                data => {
                  this.notifier.show('success', 'Registro de irregularidade realizado com sucesso!');
                  this.router.navigate(['home/map']);
                },
                error => {
                  this.loading = false;
                  this.notifier.show('error', 'Ocorreu um erro ao tentar registrar sua irregularidade.');
                });
  }

}
// <div class="row">
// <div class="col-md-4">
//     <input id='file' name="file" type='file' class="file_customizada" accept='image/*'  capture />
// </div>

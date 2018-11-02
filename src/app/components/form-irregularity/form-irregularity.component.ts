import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { IrregularityService } from '../../services/irregularity.service';
import { AclService } from 'ng2-acl';
import { NotifyService } from './../../services/notify/notify.service';

@Component({
  selector: 'app-form-irregularity',
  templateUrl: './form-irregularity.component.html',
  styleUrls: ['./form-irregularity.component.scss']
})
export class FormIrregularityComponent implements OnInit {

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private irregularityService: IrregularityService,
    public aclService: AclService,
    private notifier: NotifyService

  ) { }

  ngOnInit() {

    this.formIrregularity = this.formBuilder.group({
      title: ['', [ Validators.required, Validators.pattern(this.titlePattern)]],
      story: ['', [Validators.required, Validators.pattern(this.storyPattern)]],
      irregularity_date: ['', [Validators.required]],
      irregularity_time: ['', Validators.required],
      coordinates: '41.40338, 2.17403',
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
                  alert('Registro de ocorrência realizado com sucesso!');
                  this.router.navigate(['home']);
                },
                error => {
                  this.loading = false;
                  alert('Ocorreu um erro ao tentar registrar sua ocorrência.');
                });
  }
}
// <div class="row">
// <div class="col-md-4">
//     <input id='file' name="file" type='file' class="file_customizada" accept='image/*'  capture />
// </div>




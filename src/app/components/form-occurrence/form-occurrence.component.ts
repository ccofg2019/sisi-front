import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { OccurrenceService } from '../../services/occurrence.service';
import { AclService } from 'ng2-acl';
import { NotifyService } from './../../services/notify/notify.service';
import { Zone } from './../../models/zone.model';

@Component({
  selector: 'app-form-occurrence',
  templateUrl: './form-occurrence.component.html',
  styleUrls: ['./form-occurrence.component.scss']
})
export class FormOccurrenceComponent implements OnInit {

  involved_person: FormGroup;
  formOccurrence: FormGroup;
  loading = false;
  submitted = false;
  jQuery: any;
  today = new Date().toJSON().split('T')[0];
  date = new Date();
  minDate: string;
  public zones: Zone[];
  // Two Way Databind - passando as cordenadas para o form.
  cord;

  // Validator patterns
  titlePattern = '^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9,.!?*"#%(); -]{6,32}$';
  storyPattern = '^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9,.!?*"#%(); -]{12,256}$';
  cpfPattern = '^[0-9]{11}$';
  namePattern = '^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]{4,52}$';

  lat  = -8.05225025;
  lng  = -34.9450490084884;
  locationChosen = true;

  onChoseLocation(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChosen = true;
    this.cord = this.lat.toFixed(5) + ',' + this.lng.toFixed(5); // convertendo para string e concatenando cordenadas do mapa
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private occurrenceService: OccurrenceService,
    public aclService: AclService,
    private notifier: NotifyService,
  ) {}

  ngOnInit() {
    this.occurrenceService.getZones().subscribe((response: any) => this.zones = response.data);

    // definindo valor default para o mapa
    if (this.cord === undefined) {
      this.cord = '-8.05241,-34.94523';
    }
    this.date.setFullYear(this.date.getFullYear() - 1);
    this.minDate = this.date.toJSON().split('T')[0];
    this.formOccurrence = this.formBuilder.group({
      title: ['', [ Validators.required, Validators.pattern(this.titlePattern)]],
      story: ['', [Validators.required, Validators.pattern(this.storyPattern)]],
      occurrence_date: ['', [Validators.required]],
      occurrence_time: ['', Validators.required],
      coordinates: [this.cord, Validators.required],
      police_report: ['', Validators.required],
      estimated_loss: ['345'],
      occurrence_type_id: ['', Validators.required],
      zone_id: ['', Validators.required],
      involved_people: this.formBuilder.group({
        name: ['', Validators.pattern(this.namePattern)],
        cpf: ['', [Validators.pattern(this.cpfPattern)]],
        gender: [''],
        skin_color: [''],
        type: ['']
      }),

      occurrence_objects: this.formBuilder.group({
        object_id: [Number]
      })

    });

  }

  get f() { return this.formOccurrence.controls; }

  onSubmit() {
    this.submitted = true;

        // stop here if form is invalid
        if (this.formOccurrence.invalid) {
          console.log(this.f.occurrence_objects);
          this.notifier.show('warning', 'Erro ao tentar registrar, confira se os campos foram preenchidos corretamente.');
          return;
        }

        this.loading = true;
        this.occurrenceService.registerOccurrence(this.formOccurrence.value)
            .pipe(first())
            .subscribe(
                data => {
                  this.notifier.show('success', 'Registro de ocorrência realizado com sucesso!');
                  this.router.navigate(['home/map']);
                },
                error => {
                  this.loading = false;
                  this.notifier.show('error', 'Ocorreu um erro ao tentar registrar sua ocorrência.');
                });
  }

  confirmInvolved() {
      this.notifier.show('success', 'Envolvido Adicionado');
  }


}

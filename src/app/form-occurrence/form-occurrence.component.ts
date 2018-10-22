import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { OccurrenceService } from '../services/occurrence.service';
// import { AlertService } from '../services/alert.service';
import { AuthService } from './../services/auth/auth.service';
import { AclService } from 'ng2-acl';

@Component({
  selector: 'app-form-occurrence',
  templateUrl: './form-occurrence.component.html',
  styleUrls: ['./form-occurrence.component.scss']
})
export class FormOccurrenceComponent implements OnInit {

  formOccurrence: FormGroup;
  loading = false;
  submitted = false;

  // Validator patterns
  titlePattern = '^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9,. ]{6,32}$';
  storyPattern = '^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9,. ]{12,256}$';


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private occurrenceService: OccurrenceService,
    private authService: AuthService,
    public aclService: AclService
    // private alertService: AlertService

  ) { }

  ngOnInit() {
    if (this.authService.isLoggedIn() !== true ) {
      this.router.navigate(['']);
      return;
    }

    this.formOccurrence = this.formBuilder.group({
      title: ['', [ Validators.required, Validators.pattern(this.titlePattern)]],
      story: ['', [Validators.required, Validators.pattern(this.storyPattern)]],
      occurrence_date: ['', [Validators.required]],
      occurrence_time: ['', Validators.required],
      coordinates: '41.40338, 2.17403',
      police_report: ['', Validators.required],
      estimated_loss: ['345'],
      occurrence_type_id: ['', Validators.required],
      zone_id: ['', Validators.required],

      involved_person: this.formBuilder.group({
        name: ['', Validators.minLength(4)],
        cpf: ['', [Validators.minLength(11), Validators.maxLength(11)]],
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
          alert('Erro ao tentar registrar, confira se os campos foram preenchidos corretamente.');
          return;
        }

        this.loading = true;
        this.occurrenceService.registerOccurrence(this.formOccurrence.value)
            .pipe(first())
            .subscribe(
                data => {
                  alert('Registro de ocorrência realizado com sucesso!');
                  this.router.navigate(['home']);
                  // this.alertService.success('Registration successful', true);
                },
                error => {
                  // this.alertService.error(error);
                  this.loading = false;
                  alert('Ocorreu um erro ao tentar registrar sua ocorrência.');
                });
  }



}

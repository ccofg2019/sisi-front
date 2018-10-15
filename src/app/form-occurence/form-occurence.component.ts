import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { OccurenceService } from '../services/occurence.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-form-occurence',
  templateUrl: './form-occurence.component.html',
  styleUrls: ['./form-occurence.component.scss']
})
export class FormOccurenceComponent implements OnInit {

  FormOccurence: FormGroup;
  loading = false;
  submitted;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private occurenceService: OccurenceService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.FormOccurence = this.formBuilder.group({
      title: ['', Validators.required],
      story: ['', Validators.required],
      occurrence_date: ['', Validators.required],
      occurrence_time: ['', Validators.required],
      coordinates: "41.40338, 2.17403",
      police_report: ['', Validators.required],
      estimated_loss: [''],
      occurrence_type_id: ['', Validators.required],
      zone_id: ['', Validators.required],

      involved_person: this.formBuilder.group({
        name: [''],
        cpf: [''],
        gender: [''],
        skin_color: [''],
        type: ['']
      }),

      occurrence_objects: this.formBuilder.group({
        object_id: [Number, Validators.required] 
      })

    });
  }
 
  get f() {return this.FormOccurence.controls;}
  
  onSubmit(){
    this.submitted = true;

        // stop here if form is invalid
        if (this.FormOccurence.invalid) {
          console.log("teste");
            return;
        }

        this.loading = true;
        this.occurenceService.registerOccurence(this.FormOccurence.value)
            .pipe(first())
            .subscribe(
                data => {
                  this.router.navigate(['/home']);
                  this.alertService.success('Registration successful', true);
                },
                error => {
                  this.alertService.error(error);
                    this.loading = false;
                });
  }
  

 
}

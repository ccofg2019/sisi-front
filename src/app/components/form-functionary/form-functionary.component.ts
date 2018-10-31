import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NotifyService } from '../../services/notify/notify.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-form-functionary',
  templateUrl: './form-functionary.component.html',
  styleUrls: ['./form-functionary.component.scss']
})
export class FormFunctionaryComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted;

  // Validator patterns

  namePattern = '^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]{10,52}$';
  cellpPattern = '^((\\+91-?)|0)?[0-9]{11}$';
  passPattern = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$';
  phonePattern = '^((\\+91-?)|0)?[0-9]{10}$';
  cpfPattern = '^[0-9]{11}$';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private notifier: NotifyService
    ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
     /* name: ['', [Validators.required, Validators.pattern(this.namePattern) ]],
      password: ['', [Validators.required, Validators.pattern(this.passPattern)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.pattern(this.cpfPattern)]],
      birthdate: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      skin_color: ['', [Validators.required]],
      cellphone: ['', [Validators.required, Validators.pattern(this.cellpPattern)]],
      phone: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
      terms: ['', [Validators.required]],
      role: ['', [Validators.required]],
      status: 'ATIVO'*/

      name: [''],
      password: [''],
      email: [''],
      cpf: [''],
      birthdate: [''],
      gender: [''],
      skin_color: [''],
      cellphone: [''],
      phone: [''],
      terms: [''],
      role: [5],
      status: 'ATIVO'
    });
  }

  get f() {return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
          this.notifier.show('warning', 'Confira se os campos foram preenchidos corretamente.');
          return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {

                  this.router.navigate(['']);
                },
                error => {
                  this.loading = false;
                });
  }

}

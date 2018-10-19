import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
    ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required, Validators.minLength(4)],
      password: ['', Validators.required, Validators.minLength(6), Validators.maxLength(16)],
      email: ['', Validators.required, Validators.email],
      cpf: ['', Validators.required, Validators.minLength(11), Validators.maxLength(11)],
      birthdate: ['', Validators.required],
      gender: ['', Validators.required],
      skin_color: ['', Validators.required],
      cellphone: ['', Validators.required, Validators.minLength(11), Validators.maxLength(11)],
      phone: ['', Validators.required, Validators.minLength(10), Validators.maxLength(10)],
      status: 'ATIVO'
    });
  }

  get f() {return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
          alert('Erro ao tentar cadastrar, confira se os campos foram preenchidos corretamente.');
          return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                  alert('Cadastro realizado com sucesso!');
                  this.router.navigate(['']);
                  this.alertService.success('Registration successful', true);
                },
                error => {
                  this.alertService.error(error);
                  this.loading = false;
                  alert('Ocorreu um erro ao tentar cadastrar sua conta.');
                });
  }
}

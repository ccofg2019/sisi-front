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
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      cpf: ['', Validators.required],
      birthdate: ['', Validators.required],
      gender: ['', Validators.required],
      skin_color: ['', Validators.required],
      cellphone: ['', Validators.required],
      phone: ['', Validators.required],
      status: 'ATIVO'
    });
  }

  get f() {return this.registerForm.controls;}

  onSubmit(){
    this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                  alert("Cadastro realizado com sucesso!");
                  this.router.navigate(['']);
                  this.alertService.success('Registration successful', true);
                },
                error => {
                  this.alertService.error(error);
                  this.loading = false;
                  alert("Ocorreu um problema ao cadastrar sua conta.");
                });
  }
  

}

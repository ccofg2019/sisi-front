import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { NotifyService } from '../../services/notify/notify.service';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted;
  // Date variables
  date = new Date();
  date2 = new Date();
  minDate: string;
  maxDate: string;

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
    // Set min and max dates for datepicker
    this.date.setFullYear(this.date.getFullYear() - 95);
    this.date2.setFullYear(this.date2.getFullYear() - 16);
    this.minDate = this.date.toJSON().split('T')[0];
    this.maxDate = this.date2.toJSON().split('T')[0];

    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(this.namePattern) ]],
      password: ['', [Validators.required, Validators.pattern(this.passPattern)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.pattern(this.cpfPattern)]],
      birthdate: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      skin_color: ['', [Validators.required]],
      cellphone: ['', [Validators.required, Validators.pattern(this.cellpPattern)]],
      phone: ['', [Validators.pattern(this.phonePattern)]],
      role_id: [1],
      terms: ['', [Validators.required]],
      status: 'ATIVO'
    });
  }

  get f() {return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

        // Stop here if form is invalid
        if (this.registerForm.invalid) {
          this.notifier.show('warning', 'Confira se os campos foram preenchidos corretamente.');
          return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                  console.log(data);
                  this.notifier.show('success', 'Usuário registrado com sucesso');
                  this.router.navigate(['']);
                },
                error => {
                  console.log(error);
                  this.notifier.show('error', 'Houve um erro ao tentar registrar');
                  this.loading = false;
                });
  }
}

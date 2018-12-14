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

  registerFormFunc: FormGroup;
  loading = false;
  submitted;
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
    this.date.setFullYear(this.date.getFullYear() - 95);
    this.date2.setFullYear(this.date2.getFullYear() - 16);
    this.minDate = this.date.toJSON().split('T')[0];
    this.maxDate = this.date2.toJSON().split('T')[0];

    this.registerFormFunc = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(this.namePattern) ]],
      password: ['', [Validators.required, Validators.pattern(this.passPattern)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, Validators.pattern(this.cpfPattern)]],
      birthdate: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      skin_color: ['', [Validators.required]],
      cellphone: ['', [Validators.required, Validators.pattern(this.cellpPattern)]],
      phone: ['', [Validators.pattern(this.phonePattern)]],
      role_id: [1, [Validators.required]],
      status: 'ATIVO'
    });
  }

  get f() {return this.registerFormFunc.controls; }

  onSubmit() {
    this.submitted = true;

        // stop here if form is invalid
        if (this.registerFormFunc.invalid) {
          this.notifier.show('warning', 'Confira se os campos foram preenchidos corretamente.');
          return;
        }
        this.loading = true;
        this.userService.registerFuncionario(this.registerFormFunc.value)
            .pipe(first())
            .subscribe(
                data => {
                  this.notifier.show('success', 'Funcionário cadastrado com sucesso!');
                  this.router.navigate(['home/map']);
                },
                error => {
                  this.notifier.show('error', 'Desculpe, ocorreu um problema, suas informações não foram enviadas.');
                  this.loading = false;
                });
  }

}

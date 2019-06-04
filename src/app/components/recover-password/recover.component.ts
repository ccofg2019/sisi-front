import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { NotifyService } from '../../services/notify/notify.service';


@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {

  public recoverForm: FormGroup;
  public btn_title: string;
  submitted;
  loading = false;

  // Date variables
  date = new Date();
  date2 = new Date();
  minDate: string;
  maxDate: string;

  // Validator patterns
  passPattern = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$';
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

    this.recoverForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
    });

    this.btn_title = 'Recuperar Senha'
  }

  get f() {return this.recoverForm.controls; }

  onSubmit() {
    this.submitted = true;
        // Stop here if form is invalid
        console.log(this.recoverForm);
        if (this.recoverForm.invalid) {
          this.notifier.show('warning', 'Confira se os campos foram preenchidos corretamente.');
          return;
        }
        console.log('Enviando');
        this.loading = true;
        this.userService.recoverPassword(this.recoverForm.value)
            .pipe(first())
            .subscribe(
                data => {
                  console.log(data);
                  this.notifier.show('success', 'Agora digite sua nova senha');
                },
                error => {
                  console.log(error);
                  this.notifier.show('error', 'Por favor verifique os dados informados');
                  this.loading = false;
                });
  }

}

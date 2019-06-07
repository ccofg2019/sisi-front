import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { NotifyService } from '../../services/notify/notify.service';
import { UserService } from '../../services/user.service';
import { first } from 'rxjs/operators';



@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss']
})
export class InputPasswordComponent implements OnInit {

  public inputPasswordForm: FormGroup;
  public btn_title: string;
  submitted;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private notifier: NotifyService,
  ) {
  }

  ngOnInit() {
    this.btn_title = 'Confirmar';
    this.inputPasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });

  }

  get f() {return this.inputPasswordForm.controls; }

  onSubmit() {
    this.submitted = true;
        // Stop here if form is invalid
        console.log(this.inputPasswordForm);
        if (this.inputPasswordForm.invalid || this.inputPasswordForm.value.password != this.inputPasswordForm.value.confirmPassword) {
          console.log('SENHAS INVALIDAS');
          alert('As senhas não são iguais');
          return;
        } else {
          var newData = {
            "key": window.sessionStorage.getItem('changepasswordkey'),
            "newPassword": this.inputPasswordForm.value.password
          }
  
          this.loading = true;
          this.userService.changePassword(newData)
              .pipe(first())
              .subscribe(
                  data => {
                    console.log(data);
                    this.notifier.show('success', 'Sua senha foi alterada!');
                    this.router.navigate(['']);
                  },
                  error => {
                    console.log(error);
                    this.notifier.show('error', 'Por favor verifique os dados informados');
                    this.loading = false;
                  });
        }
  }


  
}

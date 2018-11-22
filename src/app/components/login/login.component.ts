import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import { NotifyService } from '../../services/notify/notify.service';
import { AclService } from 'ng2-acl';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public btn_title: string;
  public status = { 'loading': false, error: false };

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notifier: NotifyService,
    public aclService: AclService
  ) {
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['home']);
      return;
    }

    this.btn_title = 'Entrar';

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]

    });

  }

  private controlStateLogin(state: string): void {

    if (state === 'loading') {
      this.status.loading = true;
      this.status.error = false;
      this.btn_title = 'Entrando';
      this.loginForm.controls.email.setErrors(null);
      this.loginForm.controls.password.setErrors(null);


    } else {
      this.status.error = true;
      this.status.loading = false;
      this.btn_title = 'Entrar';
      this.loginForm.controls.email.reset();
      this.loginForm.controls.password.reset();
    }

  }

  public login(): void {

    if (this.loginForm.invalid) {
      this.notifier.show('warning', 'Confira se os campos foram preenchidos corretamente.');
      return;
    }

    if (this.loginForm.valid && !this.status.loading) {
      this.controlStateLogin('loading');

      this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        (res) => {
          this.router.navigate(['home']);
          this.authService.loginInfo(true);

        },
        (err) => {
          this.controlStateLogin('error');
        });

    }

  }

}

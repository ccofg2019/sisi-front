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


  public btn_title: string;
  public status = { 'loading': false, error: false };
  public form: FormGroup;

  @Output() loginSubmit: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private notify: NotifyService,
    public aclService: AclService
  ) {
  }


  /**
   * Controla o estado e texto do botão de login
   *
   * @param {string} state
   */
  private controlStateLogin(state: string): void {

    if (state === 'loading') {
      this.status.loading = true;
      this.status.error = false;
      this.btn_title = 'Entrando';
      this.form.controls.email.setErrors(null);
      this.form.controls.password.setErrors(null);


    } else {
      this.status.error = true;
      this.status.loading = false;
      this.btn_title = 'Entrar';
      this.form.controls.email.reset();
      this.form.controls.password.reset();
    }

  }


  /**
   * Login de usuário
   */
  public login(): void {
    if (this.form.valid && !this.status.loading) {
      this.controlStateLogin('loading');

      this.authService.loginUser(this.form.value.email, this.form.value.password).subscribe(
        (res) => {
          this.router.navigate(['home']);
          this.loginSubmit.emit(true);

        },
        (err) => {
          this.controlStateLogin('error');
        });

    }

  }


  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['home']);
      return;
    }

    this.btn_title = 'Entrar';

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]

    });

  }
}

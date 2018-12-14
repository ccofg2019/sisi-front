import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AclService } from 'ng2-acl';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { first } from 'rxjs/operators';
import { NotifyService } from '../../services/notify/notify.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-perfil-user',
  templateUrl: './perfil-user.component.html',
  styleUrls: ['./perfil-user.component.scss']
})
export class PerfilUserComponent implements OnInit {

  public user: User;
  public idUser: number;
  public idRole: number;
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  
  // Validator patterns
  namePattern = '^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]{10,52}$';
  cellpPattern = '^((\\+91-?)|0)?[0-9]{11}$';
  passPattern = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$';
  phonePattern = '^((\\+91-?)|0)?[0-9]{10}$';
  cpfPattern = '^[0-9]{11}$';

 constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    public aclService: AclService,
    private notifier: NotifyService,
    private authService: AuthService
  ) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.authService.getUserAuthenticated()
        .subscribe( (user: any) => {
          this.user = user.data.data;
          this.idUser = user.data.data.id;
          console.log(this.idUser);
          this.registerForm = this.formBuilder.group({
            name: [this.user.name, [Validators.required, Validators.pattern(this.namePattern) ]],
            //password: ['', [Validators.required, Validators.pattern(this.passPattern)]],
            email: [this.user.email, [Validators.required, Validators.email]],
            cpf: [this.user.cpf, [Validators.required, Validators.pattern(this.cpfPattern)]],
            birthdate: [this.user.birthdate, [Validators.required]],
            gender: [this.user.gender, [Validators.required]],
            skin_color: [this.user.skin_color, [Validators.required]],
            cellphone: [this.user.cellphone, [Validators.required, Validators.pattern(this.cellpPattern)]],
            phone: [this.user.phone, [Validators.pattern(this.phonePattern)]],
            status: 'ATIVO'
          });

         

        });
      }
    );

  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
   

    this.submitted = true;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
          this.notifier.show('warning', 'Erro ao tentar atualizar perfil, confira se os campos foram preenchidos corretamente.');
          return;
        }

        this.loading = true;
        this.userService.editarUser(this.registerForm.value, this.idUser)
            .pipe(first())
            .subscribe(
                data => {
                  this.notifier.show('success', 'Perfil atualizado com sucesso!');
                  this.router.navigate(['/home']);
                },
                error => {
                  this.loading = false;
                  this.notifier.show('error', 'Ocorreu um erro ao tentar atualizar o perfil, suas informações não foram alteradas.');
                });
  }

}

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AclService } from 'ng2-acl';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { first } from 'rxjs/operators';
import { NotifyService } from '../../services/notify/notify.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  public user: User;
  public idUser: number;
  public idRole: number;
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  // Date variables
  date = new Date();
  date2 = new Date();
  minDate: string;
  maxDate: string;

  // ativar edição - GAMB
  disabled = true;
  disabledSelect = false;
  nameButtom = "Editar";

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
    private notifier: NotifyService
  ) { }

  ngOnInit() {
    // Set min and max dates for datepicker
    this.date.setFullYear(this.date.getFullYear() - 95);
    this.date2.setFullYear(this.date2.getFullYear() - 16);
    this.minDate = this.date.toJSON().split('T')[0];
    this.maxDate = this.date2.toJSON().split('T')[0];
    

    this.route.params.subscribe(
      (params: Params) => {
        this.userService.getUserID(params.id)
        .subscribe( (user: any) => {
          this.user = user.data;
          this.idUser = user.data.id;
          this.idRole = user.data.role.id;
      
          console.log(this.idRole);
          this.registerForm = this.formBuilder.group({
            name: [user.data.name, [Validators.required, Validators.pattern(this.namePattern) ]],
            // password: [user.data.password, [Validators.required, Validators.pattern(this.passPattern)]],
            email: [user.data.email, [Validators.required, Validators.email]],
            cpf: [user.data.cpf, [Validators.required, Validators.pattern(this.cpfPattern)]],
            birthdate: [user.data.birthdate, [Validators.required]],
            gender: [user.data.gender, [Validators.required]],
            skin_color: [user.data.skin_color, [Validators.required]],
            cellphone: [user.data.cellphone, [Validators.required, Validators.pattern(this.cellpPattern)]],
            phone: [user.data.phone, [Validators.pattern(this.phonePattern)]],
            role_id: [user.data.role.id],
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
          this.notifier.show('warning', 'Erro ao tentar editar uma ocorrência, confira se os campos foram preenchidos corretamente.');
          return;
        }

        this.loading = true;
        this.userService.editarUser(this.registerForm.value, this.idUser)
            .pipe(first())
            .subscribe(
                data => {
                  this.notifier.show('success', 'Usuário editado com sucesso!');
                  this.router.navigate(['/list-user']);
                },
                error => {
                  this.loading = false;
                  this.notifier.show('error', 'Ocorreu um erro ao tentar editar um usuário, suas informações não foram alterada.');
                });
  }

  onDisable(){
    if(this.disabled){
      // ativa
      this.disabled = false;
      this.disabledSelect = true;
      this.nameButtom = "Cancelar";
    }else{
      // desativa
      this.disabled = true;
      this.disabledSelect = false;
      this.nameButtom = "Editar"
    }

  }

}

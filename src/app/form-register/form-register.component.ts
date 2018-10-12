import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.scss']
})
export class FormRegisterComponent implements OnInit {

  usuario: any ={
    nome: '',
    senha: '',
    senha2: '',
    cpf: '',
    nascimento: '',
    genero: '',
    etinia: '',
    telefone1: '',
    telefone2: '',
    email: ''
  }

  onSubmit(form){
    //console.log(form);
    console.log(this.usuario);

    /*
    Resolução do erro .map() 
    1- Importar no componete usar o comando -> import 'rxjs/add/operator/map';
    2- Usar o codigo -> npm install --save rxjs-compat

    JSON.stringify(form.value) -> pega toda a informação do formulário e converte em JSON
    
    testar a requisição post - https://resttesttest.com/
    */
    this.http.post('https://httpbin.org/post', JSON.stringify(form.value)).map(res => res).subscribe(dados => console.log(dados));
  }

  constructor(private http: Http) { }



  ngOnInit() {
  }

}

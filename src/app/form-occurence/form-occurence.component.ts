import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-form-occurence',
  templateUrl: './form-occurence.component.html',
  styleUrls: ['./form-occurence.component.scss']
})
export class FormOccurenceComponent implements OnInit {
/*
  occurence: any ={
    tipoOcorrencia: '',
    dataHora: '',
    objAssociados: '',
    numeroRua: '',
    cep: '',
    bairro: '',
    endereco: '',
    descOcorrencua: ''
  }
*/
  constructor(private Http: Http) { }

  ngOnInit() {
  }
 
  consultaCEP(cep, form){
    // Nova variável "cep" somente com números
    cep = cep.replace(/\D/g,'');

    //verifica se campo cep possui valor informado.
    if(cep != ""){
      //Expressão regular para validar CEP.
      var validaCep = /^[0-9]{8}$/;

      //Valida o formato do CEP
      if(validaCep.test(cep)){
        this.Http.get(`//viacep.com.br/ws/${cep}/json`)
        .map(dados => dados.json())
        .subscribe(dados => this.populaDadosForm(dados, form));
      }
    }

  }

  populaDadosForm(dados, form){

    form.setValue({
      ocorrencia: form.value.ocorrencia,
      dataHora: form.value.dataHora,
      objAssociados: form.value.objAssociados,
      numeroRua: form.value.numeroRua,
      descOcorrencua: form.value.descOcorrencua,
      cep: dados.cep,
      bairro: dados.bairro,
      endereco: dados.logradouro
      

    
    });
  }

  onSubmit(form){
    //console.log(form);

    /*
    Resolução do erro .map() 
    1- Importar no componete usar o comando -> import 'rxjs/add/operator/map';
    2- Usar o codigo -> npm install --save rxjs-compat

    JSON.stringify(form.value) -> pega toda a informação do formulário e converte em JSON
    
    testar a requisição post - https://resttesttest.com/
    */
    this.Http.post('https://httpbin.org/post', JSON.stringify(form.value)).map(res => res).subscribe(dados => console.log(dados));
  }
  

 
}

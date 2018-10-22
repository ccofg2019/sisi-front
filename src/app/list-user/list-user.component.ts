import { User, Page, Links } from './../models/user.model';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  providers: [ UserService ]
})

export class ListUserComponent implements OnInit {

  public users: User[];
  public page: Page;
  public TotalPage;

  numPage = 1;
  
  constructor(private userService: UserService) { }
  ngOnInit() {
    //this.userService.getUsers().subscribe((response: any) => this.users = response.data);
    this.pageUsers(1);
  }

  //BUSCANDO AS INFORMAÇÕES DA TABELA E AS INFORMAÇÕES DA PAGINAÇÃO
  pageUsers(page){
    this.userService.getUsersPage(page)
    .subscribe((response: any) => {
      this.page = response.pagination
      this.users = response.data
      this.TotalPage = response.meta.pagination.total_pages
      this.BuscarMaxPage(this.TotalPage);
    } );
  }

  BuscarMaxPage(pageMax){
    pageMax = this.TotalPage;
    return this.TotalPage;
  }

  nextPage(){
    if(this.numPage < this.TotalPage){
      this.numPage = this.numPage +1;
      this.pageUsers(this.numPage);
      console.log(this.numPage);
    }
  }

  previousPage(){
    if(this.numPage != 1){
      this.numPage = this.numPage -1;
      this.pageUsers(this.numPage);
      console.log(this.numPage);
    }
  }
  
 

}

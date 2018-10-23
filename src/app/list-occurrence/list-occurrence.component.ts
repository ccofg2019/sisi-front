import { OccurrenceService } from './../services/occurrence.service';
import { Occurrence, Page, Links } from '../models/occurrence.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth/auth.service';
import { Router } from '@angular/router';
import { AclService } from 'ng2-acl';

@Component({
  selector: 'app-list-occurrence',
  templateUrl: './list-occurrence.component.html',
  styleUrls: ['./list-occurrence.component.scss'],
  providers: [ OccurrenceService ]
})
export class ListOccurrenceComponent implements OnInit {

  public occurrences: Occurrence[];
  public page: Page;
  public TotalPage;

  numPage = 1;

  constructor(
    private occurrenceService: OccurrenceService,
    private router: Router,
    private authService: AuthService,
    public aclService: AclService
    ) { }

  ngOnInit() {
    if (this.authService.isLoggedIn() !== true ) {
      this.router.navigate(['']);
      return;
    }
    this.pageOccurrences(1);
    this.occurrenceService.getOccurrences().subscribe((response: any) => this.occurrences = response.data);
    }
    pageOccurrences(page) {
      this.occurrenceService.getOccurrencesPage(page)
      .subscribe((response: any) => {
        this.page = response.pagination;
        this.occurrences = response.data;
        this.TotalPage = response.meta.pagination.total_pages;
        this.BuscarMaxPage(this.TotalPage);
      } );
    }

  BuscarMaxPage(pageMax) {
    pageMax = this.TotalPage;
    return this.TotalPage;
  }

  nextPage() {
    if (this.numPage < this.TotalPage) {
      this.numPage = this.numPage + 1;
      this.pageOccurrences(this.numPage);
      console.log(this.numPage);
    }
  }

  previousPage() {
    if (this.numPage !== 1) {
      this.numPage = this.numPage -  1;
      this.pageOccurrences(this.numPage);
      console.log(this.numPage);
    }
  }
}

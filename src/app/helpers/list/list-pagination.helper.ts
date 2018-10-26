import { Paginator } from '../../models/paginator.model';

export class ListPagination {

  protected service: any;
  protected methodLoad: string;
  public data: Object[];
  protected paginator: Paginator;


  constructor () {
    this.paginator = { current_page: 1 };
  }


  loadData(): void {
    this.service[this.methodLoad](this.paginator).subscribe(
      (listData: any) => {
        this.paginator = listData.meta.pagination;
        this.data = listData.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  nextPage() {

    if (this.paginator.current_page < this.paginator.total_pages) {
      this.paginator.current_page ++;
      this.loadData();
    }
  }

  previousPage() {

    if (this.paginator.current_page !== 1) {
      this.paginator.current_page --;
      this.loadData();
    }
  }
}

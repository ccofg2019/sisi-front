import { Page, Links } from '../models/page.model';

export class ListHelper {

  protected service: string;
  protected methodLoad: string;
  protected data: Object[];
  protected paginator: Page;

  constructor () {}

  pagination(data) {
    this[this.service][this.methodLoad](data).subscribe(
      (listData: any) => {
        this.paginator = listData.pagination;
        this.data = listData.data;
        this.paginator.total_pages = listData.meta.pagination.total_pages;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  nextPage() {
    if (this.paginator.current_page < this.paginator.total_pages) {
      this.paginator.current_page = this.paginator.current_page ++;
      this.pagination(this.paginator.current_page);
    }
  }

  previousPage() {
    if (this.paginator.current_page !== 1) {
      this.paginator.current_page = this.paginator.current_page --;
      this.pagination(this.paginator.current_page);
    }
  }
}

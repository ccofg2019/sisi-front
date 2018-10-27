export class Paginator {
  total?: number;
  count?: number;
  per_page?: number;
  current_page: number;
  total_pages?: number;
  links?: Links;
}

export class Links {
  previous: string;
  next: string;
}

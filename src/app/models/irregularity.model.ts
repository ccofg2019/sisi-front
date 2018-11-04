export class Irregularity {
  title: string;
  story: string;
  coordinates: string;
  irregularity_type_id: string;
  zone_id: string;
}

export class Page {
total: number;
count: number;
per_page: number;
current_page: number;
total_pages: number;
links: Links;
}

export class Links {
previous: string;
next: string;
}

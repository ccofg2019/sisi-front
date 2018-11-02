export class Irregularity {
  title: string;
  story: string;
  occurrence_date: string;
  occurrence_time: string;
  coordinates: string;
  police_report: boolean;
  estimated_loss: string;
  occurrence_type_id: string;
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

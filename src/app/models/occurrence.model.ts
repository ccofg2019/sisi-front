export class Occurrence {
    title: string;
    story: string;
    occurrence_date: string;
    occurrence_time: string;
    coordinates: string;
    police_report: boolean;
    estimated_loss: string;
    occurrence_type_id: string;
    zone_id: string;
        involved_people: [{
            name: string;
            cpf: string;
            gender: string;
            skin_color: string;
            type: string;
            }];
    occurrence_objects: [{
            object_id: number;
    }];
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

export class Occurence {
    title: string;
    story: string;
    occurrence_date: string;
    occurrence_time: string;
    coordinates: string;
    police_report: boolean;
    estimated_loss: string;
    occurrence_type_id: string;
    zone_id: string;
        involved_person: [{
            name: string;
            cpf: string;
            gender: string;
            skin_color: string;
            type: string;
            }];
    occurrence_objects: [{
            object_id: number;
    }]
    
}
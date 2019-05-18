import { PositionEmergencies } from "./position_emergencies";
import { User } from "./user";

export class Emergency{

    id: number;
    status: string;
    created_at: string;
    updated_at: string;
    position_emergencies: PositionEmergencies[];
    user: User

    constructor(){
        this.position_emergencies = new PositionEmergencies[1];
        this.user = new User();
    }    
}
import { User } from "./user";

export class InfoWindow{
    user: User;
    FormAttendIsHidden: boolean;
    FormFinishIsHidden: boolean;

    constructor(){
        this.user = new User();
    }
}
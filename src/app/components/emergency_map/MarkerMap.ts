import { InfoWindow } from "./InfoWindow";

export class MarkerMap{
    emergencyId: number;
    latitude: string;
    longitude: string;
    iconUrl: string;
    animation: string;
    infoWindow: InfoWindow;

    constructor(){
        this.infoWindow = new InfoWindow();
    }
    
}
import { OccurrenceTypes } from "./occurrenceTypes.models";

export class OccurrenceFilter {
    constructor(        
        public year?:number,
        public month?: number,
        public occurrenceTypesId?: number,
        public occurrenceTypes?: OccurrenceTypes, 
    ){}
}
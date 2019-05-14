import { IrregularityTypes } from "./irregularityTypes.model";

export class IrregularityFilter {
    constructor(        
        public year?:number,
        public month?: number,
        public irregularityTypesId?: number,
        public irregularityTypes?: IrregularityTypes, 
    ){}
}
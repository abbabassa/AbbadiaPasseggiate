import { DescReferences } from './desc-references';

export class LocationData {
    constructor(
        public id:number, 
        public description:string[],
        public name:string,
        public rating=0,
        public refs: DescReferences[]
        ){}
}
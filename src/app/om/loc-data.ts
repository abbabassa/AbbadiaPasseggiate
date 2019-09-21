import { DescReferences, DescRefTypes } from './desc-references';
import { MainData } from './main-data';

export class LocationData implements MainData{
    public readonly type: DescRefTypes
    
    constructor(
        public id:number, 
        public description:string[],
        public name:string,
        public rating=0,
        public refs: DescReferences[]
        ){
            this.type = DescRefTypes.Location;
        }

    public static clone(oldLoc : LocationData): LocationData
    {
        return new LocationData(oldLoc.id, oldLoc.description, oldLoc.name, oldLoc.rating, oldLoc.refs);
    }
}
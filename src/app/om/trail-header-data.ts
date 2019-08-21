import { APImageData } from './img-data';
import { MainData } from './main-data';
import { DescRefTypes } from './desc-references';

export class TrailHeaderData implements MainData {
    public readonly type: DescRefTypes ;
    
    constructor(
        
        public id:number, 
        public mainDescr:string,
        public name:string,
        public rating=0,
        public mainPhoto : APImageData,
        public trailPhotos : APImageData[]        
        )
        {
            this.type  = DescRefTypes.Trail;
        }
    
    public static clone(oldLink: TrailHeaderData)
    {
        return new TrailHeaderData(oldLink.id, oldLink.mainDescr, oldLink.name, oldLink.rating, oldLink.mainPhoto, oldLink.trailPhotos);
    }
}
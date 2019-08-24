import { APImageData } from './img-data';
import { MainData } from './main-data';
import { DescRefTypes } from './desc-references';
import { ParWithRefs, ParWithRefsInput } from './par-with-refs';

export class TrailHeaderData implements MainData {
    public readonly type: DescRefTypes ;
    
    constructor(
        
        public id:number, 
        public pars:ParWithRefs[],
        public name:string,
        public level,
        // public mainPhoto : APImageData,
        // public trailPhotos : APImageData[],
        public rating=0
        )
    {
        this.type  = DescRefTypes.Trail;
    }
    
    public static generateMainData(input :TrailHeaderDataInput)
    {
        return new TrailHeaderData(input.id, input.pars.map (inPar => ParWithRefs.generatePar(inPar)), input.name, input.level, input.rating);
    }

}

export interface TrailHeaderDataInput
{
    id:number;
    name:string;
    level:number;
    rating:number;
    pars:ParWithRefsInput[];
}
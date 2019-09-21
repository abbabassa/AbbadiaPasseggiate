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
        public rating=0,
        public stepsLayerName: string,
        public intersectionsLayerName : string
        )
    {
        this.type  = DescRefTypes.Trail;
    }
    
    public static generateMainData(input :TrailHeaderDataInput)
    {
        return new TrailHeaderData(
                                    input.id, 
                                    input.pars.map(inPar => ParWithRefs.generatePar(inPar)).sort((par1,par2)=> par1.parIndex - par2.parIndex),
                                    input.name, 
                                    input.level, 
                                    input.rating,
                                    input.stepsLayerName,
                                    input.intersectionsLayerName);
    }

}

export interface TrailHeaderDataInput
{
    id:number;
    name:string;
    level:number;
    rating:number;
    pars:ParWithRefsInput[];
    stepsLayerName: string;
    intersectionsLayerName : string;

}
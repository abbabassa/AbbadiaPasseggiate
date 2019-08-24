import { DescReferences } from './desc-references';
import { ParWithRefs, ParWithRefsInput } from './par-with-refs';

export class TrailParDesc extends ParWithRefs
{
    constructor(
        description : string,
        initDescRefs: DescReferences[],
        parIndex : number,
        public mainTrailsID:number,
        public featureId: number,

        //TODO  add here and on the db an array of intersection feature ids. 
        //      in the feature will be saved a referece to the location id (new kind of location for it), that will link to a photo


    )
    {
        super(description, initDescRefs, parIndex);
    }



    public static generatePar(input : TrailParDescInput): TrailParDesc
    {
        if(!input)
            return null;
        return new TrailParDesc(input.description, input.ref, input.parIndex, input.mainTrailsID, input.featureId);
    }


    
}

export interface TrailParDescInput extends ParWithRefsInput
{
    mainTrailsID:number;
    featureId: number;
}
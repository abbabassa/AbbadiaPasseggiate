import { APImageData } from './img-data';
import { DescReferences } from './desc-references';

/**
 * It represents a paragraph with reference informations
 */
export class ParWithRefs 
{
    public descriptions : string [];
    public descRefs: DescReferences[];
    
    constructor(
        description : string,
        initDescRefs: DescReferences[],
        public parIndex : number
    ) {
        
        this.descriptions = [];
        
        if(!description )
          return;
        
        
        

        
        this.descriptions = description.split(/\{\d*\}/);
        this.descRefs = [];

        let continueAnalyze : Boolean = true;
        while(continueAnalyze)
        {
            let matchResult :RegExpMatchArray =description.match(/\{\d*\}/);
            if (matchResult && matchResult.length > 0)
            {
                description = description.substr(matchResult.index+matchResult[0].length)
                let id = +matchResult[0].substr(1,1);
                let index =  initDescRefs.findIndex( ref => ref.index == id);
                this.descRefs.push( initDescRefs[index]);

            }else
            {

                continueAnalyze = false;
            }
        }
        
     
     
    }

    public static generatePar(input : ParWithRefsInput): ParWithRefs
    {
        if(!input)
            return null;
        return new ParWithRefs(input.description, input.ref, input.parIndex);


    }

    

    
}


export interface ParWithRefsInput
{
    description : string;
    ref:DescReferences[];
    parIndex: number

}
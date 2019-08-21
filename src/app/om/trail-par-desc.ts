import { APImageData } from './img-data';
import { DescReferences } from './desc-references';

export class TrailParDesc 
{
    public descriptions : string [];
    public descRefs: DescReferences[];
    
    constructor(
        description : string,
        initDescRefs: DescReferences[],
        public mainTrailsID:number,
        public parId : number,
        public intersectionsPhotos: APImageData[],
        public centerCoordinates : number [],
        public locFeatures : any[], // feature dei luoghi, capire poi se usare oggetto OL
        public pathFeature: any // feature del percorso, capire poi se usare oggetto OL,


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

    
}
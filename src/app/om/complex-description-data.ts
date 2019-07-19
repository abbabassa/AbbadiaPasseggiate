import { DescReferences } from './desc-references';
import { LocationData } from './loc-data';


export class ComplexDescriptionData
{
    descriptions:string[][];
    descRefs:DescReferences[][];

    constructor(locData? :LocationData )
    {
        
        this.descriptions = [];
        this.descRefs = [];
        if(!locData || ! locData.description)
          return;
        if( locData.description.length == 0)
          return;  
        
        
        
    
        for (let j  = 0; j <  locData.description.length; j++)
        { 
          let descPar: string =  locData.description[j];
          this.descriptions[j] = descPar.split(/\{\d*\}/);
          this.descRefs[j] = [];
    
          let continueAnalyze : Boolean = true;
          while(continueAnalyze)
          {
            let matchResult :RegExpMatchArray =descPar.match(/\{\d*\}/);
            if (matchResult && matchResult.length > 0)
            {
              descPar = descPar.substr(matchResult.index+matchResult[0].length)
              let id = +matchResult[0].substr(1,1);
              let index =  locData.refs.findIndex( ref => ref.index == id);
              this.descRefs[j].push( locData.refs[index]);
    
            }else
            {
    
              continueAnalyze = false;
            }
          }
         
        }
     
    }

    


}
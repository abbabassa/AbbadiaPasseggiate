import { APImageData } from './img-data';

export class TrailParDesc 
{
    constructor(
        public description : string,
        public photos: APImageData[],
        public centerCoordinates : number [],
        public locFeatures : any[], // feature dei luoghi, capire poi se usare oggetto OL
        public pathFeature: any // feature del percorso, capire poi se usare oggetto OL

    ){}
}
import { APImageData } from './img-data';

export class TrailHeaderData {
    constructor(
        public id:number, 
        public mainDescr:string,
        public name:string,
        public rating=0,
        public gpx="",
        public mainPhoto : APImageData,
        public trailPhotos : APImageData[]        
        ){}
}
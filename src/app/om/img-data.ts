




export class APImageData 
{
 



    constructor
    (
        public id:number,
        public title:string,
        public description: string[],
        public photoname: string,
        public type: APImageTypes,
        public locid: number,
        public ext: string,
        public trailId : number,
        public featureId : number
            )
    {    }
    
}


export enum APImageTypes
{
    small = 0,
    big = 1,
    bigAndSmall=2

}
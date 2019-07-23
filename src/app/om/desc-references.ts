export enum DescRefTypes
{
    Location =1,
    Trail =2
}

export class DescReferences {
    constructor(
        public index:number, 
        public id:number,
        public name:string,
        public type: DescRefTypes,
        public oldLink:string
        ){}
}
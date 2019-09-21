import { TrailHeaderData, TrailHeaderDataInput } from "./trail-header-data";
import { PreviewResponse } from './prev.response';
import { TrailParDesc, TrailParDescInput } from './trail-par-desc';

export class TrailPreviewResponse implements PreviewResponse {
    public     mainData :TrailHeaderData;
    public     pars: TrailParDesc[]
    
    constructor(inputLoc: TrailPreviewResponseInput)
    {
        this.mainData =  TrailHeaderData.generateMainData( inputLoc.mainData);
        this.pars = inputLoc.pars.map(inPars =>TrailParDesc.generatePar( inPars)).sort((par1,par2)=> par1.parIndex - par2.parIndex);
    }


}

export interface TrailPreviewResponseInput
{
    mainData: TrailHeaderDataInput;
    pars : TrailParDescInput[];
}
import { TrailHeaderData, TrailHeaderDataInput } from "./trail-header-data";
import { PreviewResponse } from './prev.response';
import { TrailParDesc, TrailParDescInput } from './trail-par-desc';

export class TrailPreviewResponse implements PreviewResponse {
    public     mainData :TrailHeaderData;
    public     pars: TrailParDesc[]
    
    constructor(inputLoc: TrailPreviewResponseInput)
    {
        this.mainData =  TrailHeaderData.generateMainData( inputLoc.mainData);
        this.pars = inputLoc.pars.map(inPars =>TrailParDesc.generatePar( inPars));
    }


}

export interface TrailPreviewResponseInput
{
    mainData: TrailHeaderDataInput;
    pars : TrailParDescInput[];
}
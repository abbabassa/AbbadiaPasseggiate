import { TrailHeaderData } from "./trail-header-data";
import { PreviewResponse } from './prev.response';
import { TrailParDesc } from './trail-par-desc';

export class TrailPreviewResponse implements PreviewResponse {
    public     mainData :TrailHeaderData;
    public     pars: TrailParDesc[]
    
    constructor
    (
        oldLoc: TrailPreviewResponse
    )
    {
        this.mainData =  TrailHeaderData.clone( oldLoc.mainData);
        this.pars = oldLoc.pars;
    }

    
    
}
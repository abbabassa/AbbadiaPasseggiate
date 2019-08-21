import { LocationData } from "./loc-data";
import { TrailHeaderData } from "./trail-header-data";
import { APImageData } from './img-data';
import { DescReferences } from './desc-references';
import { MainData } from './main-data';
import { PreviewResponse } from './prev.response';

export class LocationPreviewResponse implements PreviewResponse {
    public     mainData :LocationData;
    public     trailRefs : DescReferences[];
    public     imagesData: APImageData[];
    
    constructor
    (
        oldLoc: LocationPreviewResponse
    )
    {
        this.mainData =  LocationData.clone( oldLoc.mainData);
        this.trailRefs = oldLoc.trailRefs;
        this.imagesData = oldLoc.imagesData;
    }

    
    
}
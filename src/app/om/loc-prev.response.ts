import { LocationData } from "./loc-data";
import { TrailHeaderData } from "./trail-header-data";
import { APImageData } from './img-data';

export interface LocationPreviewResponse {
    locData :LocationData;
    trailData : TrailHeaderData[];
    imagesData: APImageData[];
}
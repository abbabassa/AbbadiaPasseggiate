import { LocationData } from "./loc-data";
import { TrailData } from "./trail-data";
import { APImageData } from './img-data';

export interface LocationPreviewResponse {
    locData :LocationData;
    trailData : TrailData[];
    imagesData: APImageData[];
}
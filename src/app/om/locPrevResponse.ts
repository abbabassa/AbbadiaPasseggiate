import { LocationData } from "./locData";
import { TrailData } from "./trailData";
import { APImageData } from './imgData';

export interface LocationPreviewResponse {
    locData :LocationData;
    trailData : TrailData[];
    imagesData: APImageData[];
}
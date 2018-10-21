import { LocationData } from "./locData";
import { TrailData } from "./trailData";

export interface LocationPreviewResponse {
    locData :LocationData;
    trailData : TrailData[];
}
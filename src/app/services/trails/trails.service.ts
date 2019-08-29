import { Injectable, Inject, LOCALE_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { TrailPreviewResponse, TrailPreviewResponseInput } from '../../om/trail-prev.response';
import { map} from 'rxjs/operators';
import { APImageData } from '../../om/img-data';

@Injectable({
  providedIn: 'root'
})
export class TrailsService {

  private locale : string;
  constructor(private http : HttpClient,  @Inject(LOCALE_ID) locale: string) { 
    this.locale = locale;
  }

  getTrailData(id:number) : Observable<TrailPreviewResponse>
  {
    return this.http.get<TrailPreviewResponseInput>(environment.protocolName + environment.serverName + `/services/trails/map/${this.locale}/${id}`)
               .pipe( map(locRes => new TrailPreviewResponse(locRes)) );
  }

  getIntersectionImageData(trailId:number, featureId: number) : Observable<APImageData[]>
  {
    return this.http.get<APImageData[]>(environment.protocolName + environment.serverName + `/services/trails/map/${this.locale}/intersection/${trailId}/${featureId}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { TrailPreviewResponse, TrailPreviewResponseInput } from '../../om/trail-prev.response';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrailsService {

  constructor(private http : HttpClient) { }

  getTrailData(id:number) : Observable<TrailPreviewResponse>
  {
    return this.http.get<TrailPreviewResponseInput>(environment.protocolName + environment.serverName + `/services/trails/map/it/${id}`)
               .pipe( map(locRes => new TrailPreviewResponse(locRes)) );
  }
}

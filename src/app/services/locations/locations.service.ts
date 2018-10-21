import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { LocationPreviewResponse } from '../../om/locPrevResponse';

@Injectable()
export class LocationsService {

  constructor(private http : HttpClient) { }

  getLocationData(id:number) : Observable<LocationPreviewResponse>
  {
    return this.http.get<LocationPreviewResponse>(environment.protocolName + environment.serverName + `/services/locations/map/it/${id}`)
  }
}

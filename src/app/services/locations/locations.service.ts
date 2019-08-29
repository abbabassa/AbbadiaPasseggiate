import { Injectable, LOCALE_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { LocationPreviewResponse } from '../../om/loc-prev.response';
import { map} from 'rxjs/operators';

@Injectable()
export class LocationsService {

  private locale : string;
  constructor(private http : HttpClient, @Inject(LOCALE_ID) locale: string) { 
    this.locale = locale;
  }

  getLocationData(id:number) : Observable<LocationPreviewResponse>
  {
    return this.http.get<LocationPreviewResponse>(environment.protocolName + environment.serverName + `/services/locations/map/${this.locale}/${id}`)
               .pipe( map(locRes => new LocationPreviewResponse( locRes) )) 
  }
}

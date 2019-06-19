import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap} from 'rxjs/operators';

import {LocationsService} from '../../services/locations/locations.service';
import { PreviewStateService } from '../../services/communication/preview-state.service';
import { LocationPreviewResponse } from '../../om/locPrevResponse';


@Component({
  selector: 'app-luoghi-preview',
  templateUrl: './luoghi-preview.component.html',
  styleUrls: ['./luoghi-preview.component.css']
})
export class LuoghiPreviewComponent implements OnInit {
  // @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';
 // @HostBinding('class.modal') 

 
  luogoInfos: LocationPreviewResponse = null;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private locationService: LocationsService,
    private previewStateService:PreviewStateService ) { }

  ngOnInit() {
    
    this.activatedRoute.paramMap
    .pipe(
      switchMap((params: ParamMap) =>  
        {
          // reset iniziale per quando cambio luogo da una scheda all'altra
          this.luogoInfos = null;
          return this.locationService.getLocationData( +params.get('id'));
        }
      )  
    )
    .subscribe(res => this.luogoInfos=res )
  }



  closePopup() {
    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet
    this.previewStateService.setState(false);
    this.router.navigate(
      [{ outlets: { luoghiPopup: null } }],
      {relativeTo: this.activatedRoute.parent} // <--- PARENT activated route.
      );
  }

}




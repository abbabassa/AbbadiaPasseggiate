import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap} from 'rxjs/operators';

import {LocationsService} from '../../services/locations/locations.service';
import { PreviewService } from '../../services/communication/preview.service';
import {  DescRefTypes} from '../../om/desc-references';
import { PreviewResponse } from '../../om/prev.response';
import { TrailsService } from '../../services/trails/trails.service';
import { TrailPreviewComponent } from './trail-preview/trail-preview.component';



@Component({
  selector: 'overlay',
  templateUrl: './map-overlay.component.html',
  styleUrls: ['./map-overlay.component.css']
})
export class MapOverlayComponent implements OnInit {
  // @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';
 // @HostBinding('class.modal') 

 @ViewChild(TrailPreviewComponent, {static: false}) trailComponent: TrailPreviewComponent;

  previewResponse : PreviewResponse;

  expanded :boolean;




  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private locationService: LocationsService,
    private trailsService : TrailsService,
    private previewService:PreviewService ) { }

  ngOnInit() {
    
    this.activatedRoute.paramMap
    .pipe(
      switchMap((params: ParamMap) =>  
        {


          this.previewResponse = null;
          if(+params.get('type')==1)
            return this.locationService.getLocationData( +params.get('id'));
          else
            return this.trailsService.getTrailData( +params.get('id'));
        }
      )  
    )
    .subscribe(res =>{ 
      this.previewResponse=res
    })
  }



  closePopup(event:any) {
    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet
    this.previewService.setState(false);
    this.router.navigate(
      [{ outlets: { luoghiPopup: null } }],
      {relativeTo: this.activatedRoute.parent} // <--- PARENT activated route.
      );
    event.stopPropagation();
  }

  onParChange(elementId:string)
  {
    console.log("parChanged")
    if(this.trailComponent)
    {
      this.trailComponent.onParChange(elementId);
    }
  }


  expand()
  {
    this.expanded = !this.expanded;
  }

}






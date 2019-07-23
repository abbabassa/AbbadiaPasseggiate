import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, ignoreElements} from 'rxjs/operators';

import {LocationsService} from '../../services/locations/locations.service';
import { PreviewService } from '../../services/communication/preview.service';
import { LocationPreviewResponse } from '../../om/loc-prev.response';
import { Lightbox } from 'ngx-lightbox';
import { ImgUrlPipe } from '../../pipes/img-url.pipe';
import { DescReferences, DescRefTypes } from '../../om/desc-references';
import { ComplexDescriptionData } from '../../om/complex-description-data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAlertComponent } from '../../modal-alert/modal-alert.component';


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

 
  _luogoInfos: LocationPreviewResponse = null;
  _descData: ComplexDescriptionData;
  expanded :boolean;

  public get luogoInfos():LocationPreviewResponse
  {
    return this._luogoInfos;
  }

  public set luogoInfos(val: LocationPreviewResponse)
  {

    this._luogoInfos = val;
    this.updateDescData()
  }

  public get descData():ComplexDescriptionData
  {
    return this._descData;
  }


  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private locationService: LocationsService,
    private previewService:PreviewService,
    private modalService: NgbModal,
    private lightBox : Lightbox,
    private imgPipe : ImgUrlPipe ) { }

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
    
    .subscribe(res => this.luogoInfos=res)
  }

  openLightBox(index: number): void {
    // open lightbox
    let lightBoxAlbum = this.luogoInfos.imagesData.map (image=> 
    {
      let desc: string = "<h5>" +image.title + "</h5>";
      if(image.description != null)
        image.description.forEach(descPar => desc += "<p>" + descPar + "</p> ");

      return {
        src : this.imgPipe.transform(image, true) ,
        caption : desc,
        thumb: this.imgPipe.transform(image, false) 
        
      } ;
    });
    this.lightBox.open(lightBoxAlbum, index);
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

  updateDescData()
  {
    if(this._luogoInfos)
      this._descData = new ComplexDescriptionData(this._luogoInfos.locData);
    else  
      this._descData = new ComplexDescriptionData();

  }

  onDescLinkClick(ref: DescReferences)
  {
    if(ref.type == DescRefTypes.Location )
    {
      
    }
    else
    {

      let modalRef = this.modalService.open(ModalAlertComponent);
      // the first callback on then is "onFullfilled"=> 
      //                                            it's triggered after I call modal.close method, and it's evalueted with the arguments I pass to that method
      // the second callback on then is "onFullfilled"=> 
      //                                            it's triggered after I call modal.dismiss method, and it's evalueted with the arguments I pass to that method
      modalRef.result.then(res=>
        {
          window.open(ref.oldLink, "_blank");
        }, res =>{} );
    }
      
  }

  expand()
  {
    this.expanded = !this.expanded;
  }

}






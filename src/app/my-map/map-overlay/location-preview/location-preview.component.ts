import { Component, OnInit, Input } from '@angular/core';
import { LocationPreviewResponse } from '../../../om/loc-prev.response';
import { ComplexDescriptionData } from '../../../om/complex-description-data';
import { ImgUrlPipe } from '../../../pipes/img-url.pipe';
import { Lightbox } from 'ngx-lightbox';
import { DescReferences } from '../../../om/desc-references';
import { PreviewService } from '../../../services/communication/preview.service';

@Component({
  selector: 'app-location-preview',
  templateUrl: './location-preview.component.html',
  styleUrls: ['./location-preview.component.scss']
})
export class LocationPreviewComponent implements OnInit {

   
  
  _luogoInfos: LocationPreviewResponse = null;
  _descData: ComplexDescriptionData;
  
  
  public get luogoInfos():LocationPreviewResponse
  {
    return this._luogoInfos;
  }

  @Input()
  public set luogoInfos(val: LocationPreviewResponse)
  {

    this._luogoInfos = val;
    this.updateDescData()
  }

  public get descData():ComplexDescriptionData
  {
    return this._descData;
  }
  
  constructor(    
              private lightBox : Lightbox,
              private imgPipe : ImgUrlPipe, 
              private previewService:PreviewService){ }

  ngOnInit() {
  }


  updateDescData()
  {
    if(this._luogoInfos)
      this._descData = new ComplexDescriptionData(this._luogoInfos.mainData);
    else  
      this._descData = new ComplexDescriptionData();

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

  onDescLinkClick(ref: DescReferences)
  {
    this.previewService.setNewRef(ref);
  }



}

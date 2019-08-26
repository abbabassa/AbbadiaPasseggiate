import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';
import { TrailPreviewResponse } from '../../../om/trail-prev.response';
import { DescReferences } from '../../../om/desc-references';
import { PreviewService } from '../../../services/communication/preview.service';
import { TrailParDesc } from '../../../om/trail-par-desc';


@Component({
  selector: 'app-trail-preview',
  templateUrl: './trail-preview.component.html',
  styleUrls: ['./trail-preview.component.scss']
})
export class TrailPreviewComponent  {


  

  private _trailInfos : TrailPreviewResponse;
  @Input()
  public set  trailInfos (val : TrailPreviewResponse)
  {
    this._trailInfos = val;
    this.previewService.setTrailHeaderData(this._trailInfos.mainData);
  }
  public get trailInfos() : TrailPreviewResponse
  {
    return this._trailInfos;
  }
  
  private _currentPar : TrailParDesc

  private set currentPar(val : TrailParDesc)
  {
    this._currentPar = val;
    this.previewService.setTrailActiveSection(val);
  }

  private get currentPar() : TrailParDesc
  {
    return this._currentPar;
  }


  constructor(private previewService : PreviewService) {
   }

  onParChange(elemId: string) {
    console.log("onParChange: " + elemId);

    if(!elemId)
    {
      this.currentPar = null;
      return;
    }
    let matchResult :RegExpMatchArray =elemId.match(/par_\d*/);
    if(!matchResult || matchResult.length == 0 || !this.trailInfos || ! this.trailInfos.pars )
    {
      this.currentPar = null;
    }
    else
    {
      let parIndex:number  = + elemId.replace("par_", "");
      this.currentPar = this.trailInfos.pars.find(par => par.parIndex == parIndex);
    }
    
  }

  isParSelected(paragraph : TrailParDesc) : boolean
  {
    return this.currentPar && paragraph.parIndex == this.currentPar.parIndex  && paragraph.mainTrailsID == this.currentPar.mainTrailsID ;
  }
  

  
  onRefClick(ref : DescReferences)
  {
    this.previewService.setNewRef(ref);
  } 

}

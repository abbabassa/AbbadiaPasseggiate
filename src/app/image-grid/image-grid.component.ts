import { Component, OnInit, Input, OnChanges, HostListener } from '@angular/core';
import { APImageData } from '../om/imgData';
import { ImgUrlPipe } from '../pipes/img-url.pipe';
import { Lightbox } from 'ngx-lightbox';
import { windowWhen } from 'rxjs/operators';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.scss']
})
export class ImageGridComponent implements OnInit, OnChanges {


  @Input()
  private imageInfo :APImageData[];
  
  @Input()
  private maxCols :number

  @Input()
  private useLightBox :boolean

  private colsInfo : APImageData[][];
  
  constructor(private lightBox : Lightbox,
              private imgPipe : ImgUrlPipe) { }

  ngOnInit() {
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.redrawGrid(this.maxCols);
  
  }

  private redrawGrid(maxColNumber: number) {
    this.colsInfo = [];
    if(!this.imageInfo || this.imageInfo.length == 0)
    {
      return;
    }
      
    for (let i = 0; i < maxColNumber; i++) {
      this.colsInfo[i] = [];
    }
    this.imageInfo.forEach((img: APImageData, i: number) => {
          this.colsInfo[i % maxColNumber].push(img);
    });
    let emptyIndex = this.colsInfo.findIndex(col => col.length == 0);
    if (emptyIndex != -1)
      this.colsInfo.splice(emptyIndex, maxColNumber - emptyIndex - 1);
    
    this.maxCols = maxColNumber;
  }

  openLightBox(colindex: number, rowindex : number): void {
    if (!this.useLightBox)
      return;

    // open lightbox
    let index = rowindex*this.maxCols + colindex
    let lightBoxAlbum = this.imageInfo.map (image=> 
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

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    let innerWidth = window.innerWidth;
    
    
    let newColNum:number = innerWidth < 576  ? 1 : this.maxCols;
    if (newColNum != this.maxCols )
    {
      this.redrawGrid(newColNum);
    }
  }

}

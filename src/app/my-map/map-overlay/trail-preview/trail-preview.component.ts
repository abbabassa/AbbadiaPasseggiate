import { Component, OnInit, Input } from '@angular/core';
import { TrailPreviewResponse } from '../../../om/trail-prev.response';

@Component({
  selector: 'app-trail-preview',
  templateUrl: './trail-preview.component.html',
  styleUrls: ['./trail-preview.component.scss']
})
export class TrailPreviewComponent implements OnInit {

  @Input()
  trailInfos: TrailPreviewResponse = null;


  constructor() { }

  ngOnInit() {
  }

}

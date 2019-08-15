import { Component, OnInit } from '@angular/core';
import { SidebarDataService } from '../services/communication/sidebar-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  photos : string [] = ["foto 1", "foto 2", "foto 3", "foto 4", "foto 5", "foto 6"]
  constructor(
    private sidebarDataService : SidebarDataService,
    private activatedRoute : ActivatedRoute
    ) { }

  ngOnInit() {
    this.activatedRoute.url.subscribe(url => this.sidebarDataService.setMainActiveByRoute(url));
  }


  onMenuClick()
  {
    this.sidebarDataService.setState(true);
  }


}

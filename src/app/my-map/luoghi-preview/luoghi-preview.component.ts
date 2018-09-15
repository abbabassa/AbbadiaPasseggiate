import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-luoghi-preview',
  templateUrl: './luoghi-preview.component.html',
  styleUrls: ['./luoghi-preview.component.css']
})
export class LuoghiPreviewComponent implements OnInit {
  // @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  title: string = "";
  luogoInfos: string = "";

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => this.title=params.get('id'));
  }



  closePopup() {
    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet
    this.router.navigate([{ outlets: { luoghiPopup: null } }]);
  }

}




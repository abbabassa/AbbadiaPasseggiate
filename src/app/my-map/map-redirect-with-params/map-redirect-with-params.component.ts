import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map-redirect-with-params',
  templateUrl: './map-redirect-with-params.component.html',
  styleUrls: ['./map-redirect-with-params.component.scss']
})
export class MapRedirectWithParamsComponent  {

  constructor( router: Router){
    router.navigate(['/map', {loc:1, trails:0}])
  }


}

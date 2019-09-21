import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MapOverlayComponent} from "./map-overlay/map-overlay.component";
import { MyMapComponent } from './my-map.component';
import { MapRedirectWithParamsComponent } from './map-redirect-with-params/map-redirect-with-params.component';

const myMapRoutes: Routes = [
    {
        path: 'map',
        component: MyMapComponent
    },
    {
      path: 'map-default',
        component: MapRedirectWithParamsComponent
    },
    {
        path: 'luoghiPrewiew/:id/:type',
        component: MapOverlayComponent,
        outlet: 'luoghiPopup'
      }
  ];    

  @NgModule({
    imports: [
      RouterModule.forChild(myMapRoutes)
    ],
    exports: [
      RouterModule
    ]
  })
  export class MyMapRoutingModule { }

  
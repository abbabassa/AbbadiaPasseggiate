import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LuoghiPreviewComponent} from "./luoghi-preview/luoghi-preview.component";
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
        path: 'luoghiPrewiew/:id',
        component: LuoghiPreviewComponent,
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

  
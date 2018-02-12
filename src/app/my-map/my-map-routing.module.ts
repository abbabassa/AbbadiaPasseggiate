import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LuoghiPreviewComponent} from "./luoghi-preview/luoghi-preview.component";
import { MyMapComponent } from './my-map.component';

const myMapRoutes: Routes = [
    {
        path: 'map',
        component: MyMapComponent
      },
    {
        path: 'luoghiPrewiew',
        component: LuoghiPreviewComponent,
        outlet: 'popup'
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

  
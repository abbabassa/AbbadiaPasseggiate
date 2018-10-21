import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from './app-routing.module'
import {MyMapRoutingModule} from './my-map/my-map-routing.module'
import { HttpClientModule } from '@angular/common/http';

import {LocationsService} from './services/locations/locations.service'

import { AppComponent } from './app.component';
import { MyMapComponent } from './my-map/my-map.component';
import { LuoghiPreviewComponent } from './my-map/luoghi-preview/luoghi-preview.component';


@NgModule({
  declarations: [
    AppComponent,
    MyMapComponent,
    LuoghiPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MyMapRoutingModule,
    HttpClientModule
  ],
  providers: [LocationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

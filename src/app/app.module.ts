import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from './app-routing.module'
import {MyMapRoutingModule} from './my-map/my-map-routing.module'
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'ngx-lightbox';
import { SidebarModule } from 'ng-sidebar';


import {LocationsService} from './services/locations/locations.service'
import {PreviewService} from './services/communication/preview.service'
import {SidebarDataService} from './services/communication/sidebar-data.service'

import { AppComponent } from './app.component';
import { MyMapComponent } from './my-map/my-map.component';
import { MapOverlayComponent } from './my-map/map-overlay/map-overlay.component';
import { ImgUrlPipe } from './pipes/img-url.pipe';
import { ImageGridComponent } from './image-grid/image-grid.component';
import { ModalAlertComponent } from './modal-alert/modal-alert.component';
import { PhotoComponent } from './photo/photo.component';
import { MapRedirectWithParamsComponent } from './my-map/map-redirect-with-params/map-redirect-with-params.component';
import { LocationPreviewComponent } from './my-map/map-overlay/location-preview/location-preview.component';
import { TrailPreviewComponent } from './my-map/map-overlay/trail-preview/trail-preview.component';



@NgModule({
  declarations: [
    AppComponent,
    MyMapComponent,
    MapOverlayComponent,
    ImgUrlPipe,
    ImageGridComponent,
    ModalAlertComponent,
    PhotoComponent,
    MapRedirectWithParamsComponent,
    LocationPreviewComponent,
    TrailPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MyMapRoutingModule,
    HttpClientModule,
    NgbModule,
    LightboxModule,
    SidebarModule.forRoot()
  ] ,
  entryComponents : [ModalAlertComponent],
  providers: [LocationsService,PreviewService, SidebarDataService, ImgUrlPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from './app-routing.module'
import {MyMapRoutingModule} from './my-map/my-map-routing.module'
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LightboxModule } from 'ngx-lightbox';

import {LocationsService} from './services/locations/locations.service'
import {PreviewStateService} from './services/communication/preview-state.service'

import { AppComponent } from './app.component';
import { MyMapComponent } from './my-map/my-map.component';
import { LuoghiPreviewComponent } from './my-map/luoghi-preview/luoghi-preview.component';
import { ImgUrlPipe } from './pipes/img-url.pipe';
import { ImageGridComponent } from './image-grid/image-grid.component';



@NgModule({
  declarations: [
    AppComponent,
    MyMapComponent,
    LuoghiPreviewComponent,
    ImgUrlPipe,
    ImageGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MyMapRoutingModule,
    HttpClientModule,
    NgbModule,
    LightboxModule  ],
  providers: [LocationsService,PreviewStateService, ImgUrlPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

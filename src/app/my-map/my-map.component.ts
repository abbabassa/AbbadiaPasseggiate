import { Component, OnInit } from '@angular/core';
import {API_KEY_BING} from './api-key-bing'
// import {layer, source, Attribution, View, Map} from 'openlayers';
import 'ol/ol.css';
import Map from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import XYZ from 'ol/source/xyz';
import OSMSource from 'ol/source/osm';
import BingSource from 'ol/source/bingmaps';
import proj from 'ol/proj';
import Attribution from 'ol/attribution';


@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrls: ['./my-map.component.css']
})
export class MyMapComponent implements OnInit {
  map: Map;

  constructor() { }

  ngOnInit() {
    let option:any={};
 
    new Map({
      target: 'map',
      layers: [
        // new TileLayer({
        //   source: new XYZ({
        //     attributions: [
        //       OSMSource.ATTRIBUTION
        //     ],
        //     url: 'http://{a-c}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png'
        //   })
        // }),
        new TileLayer({
          source: new BingSource({
           // key: 'Ak-dzM4wZjSqTlzveKz5u0d4IQ4bRzVI309GxmkgSVr1ewS6iPSrOvOKhA-CJlm3',
            key: API_KEY_BING.key,
            // use maxZoom 19 to see stretched tiles instead of the BingMaps
            // "no photos at this zoom level" tiles
            // maxZoom: 19
          })
        })
      ],
      view: new View({
        center: proj.fromLonLat([9.351, 45.89910]),
        zoom: 15
      })
    });

  }

}

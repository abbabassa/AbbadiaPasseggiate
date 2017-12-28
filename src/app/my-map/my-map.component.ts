import { Component, OnInit } from '@angular/core';
import { API_KEY_BING } from './api-key-bing'

declare var ol: any;


@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrls: ['./my-map.component.css']
})
export class MyMapComponent implements OnInit {


  constructor() { }

  ngOnInit() {
    var layers = [];
    // layers.push(new ol.layer.Tile({
    //   source: new ol.source.OSM({
    //     attributions: [
    //       new ol.Attribution({
    //         html: 'Tiles &copy; <a href="http://www.opencyclemap.org/">' +
    //           'OpenCycleMap</a>'
    //       }),
    //       ol.source.OSM.ATTRIBUTION
    //     ],
    //     url: 'http://{a-c}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png'
    //   })
    // }));

    layers.push(new ol.layer.Tile({
      preload: Infinity,
      source: new ol.source.BingMaps({
        key:  API_KEY_BING.key,
        imagerySet: 'Aerial'

      })
    }));
    var view = new ol.View({
      center: ol.proj.fromLonLat([9.351, 45.89910]),
      zoom: 15
    });
    var map = new ol.Map({
      target: 'map',
      layers: layers,
      //  9.33645°E,  45.89910°N
      view: view
    });

  }


}

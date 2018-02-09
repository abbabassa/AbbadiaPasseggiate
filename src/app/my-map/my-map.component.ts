import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { API_KEY_BING } from './api-key-bing'

import{ControlloLayer} from '../ol-custom/controls/controllo-layer'

import{SentieriLayerService} from '../services/my-map/sentieri-layer.service'





// import 'ol/ol.css';
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
  styleUrls: ['./my-map.component.css'],
  providers:[SentieriLayerService]
})
export class MyMapComponent implements OnInit {
  controlloLayer: ControlloLayer;
  @ViewChild("selectMappa", { read: ElementRef }) select: ElementRef;


  constructor(private sentieriLayerService:SentieriLayerService) { }

  ngOnInit() {



    var attributionArcGIS = new Attribution({
      html: 'Tiles &copy; <a href="http://services.arcgisonline.com/ArcGIS/' +
        'rest/services/World_Topo_Map/MapServer">ArcGIS</a>'
    });

    var attributionAP = new Attribution({
      html: 'Tiles &copy; <a href="http://www.abbadiapasseggiate.altervista.org">ABBADIA PASSEGGIATE</a>'
    });

    var layersPrimariMap: { [property: string]: any } = {
      'Road': null,
      'Aerial': null,
      'AerialWithLabels': null
    };
    var layersMap={
      layersPrimariMap: layersPrimariMap,
      overlaysAP: {}
    }

    var layers = [];
    Object.keys(layersPrimariMap).forEach(property => {
      let layer = new TileLayer({
        visible: false,
        preload: Infinity,
        source: new BingSource({
          key: API_KEY_BING.key,
          imagerySet: property
        })
      })

      layers.push(layer);
      layer.isCtrVisible=property!="Road";
      layer.isSentieriVisible=true;
      layersPrimariMap[property] = layer;


    });





    layersPrimariMap['ArcGIS terrain'] = new TileLayer({
      source: new XYZ({
        attributions: [attributionArcGIS],
        url: 'http://server.arcgisonline.com/ArcGIS/rest/services/' +
          'World_Topo_Map/MapServer/tile/{z}/{y}/{x}'


      })
    })
    layersPrimariMap['ArcGIS terrain'].isSentieriVisible=true;
    layers.push(layersPrimariMap['ArcGIS terrain']);

    layersPrimariMap['OpenCycleMap'] = new TileLayer({
      source: new OSMSource({
        attributions: [
          new Attribution({
            html: 'Tiles &copy; <a href="http://www.opencyclemap.org/">' +
              'OpenCycleMap</a>'
          })
        ],
        url: 'http://{a-c}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png'
      })
    });
    layers.push(layersPrimariMap['OpenCycleMap']);

    layersMap.overlaysAP["ctr"]=new TileLayer({
      opacity: 0.3,
      minResolution: 0.5,
      maxResolution: 6,
      visible: true,
      source: new XYZ({
        attributions: [attributionAP],
        url: 'http://localhost:3000/tiles/trasCTR/{z}/{x}/{-y}.png',
        minZoom: 14,
        maxZoom: 18
      })
    })

    layers.push(layersMap.overlaysAP["ctr"]);


    layersMap.overlaysAP["sentieri"]=this.sentieriLayerService.getSentieri();
    layers.push(layersMap.overlaysAP["sentieri"]);





    var view = new View({
      center: proj.fromLonLat([9.351, 45.89910]),
      zoom: 15
    });
    var map = new Map({
      target: 'map',
      layers: layers,
      //  9.33645°E,  45.89910°N
      view: view
    });



    this.controlloLayer = new ControlloLayer({ element: this.select.nativeElement }, layersMap);
    this.controlloLayer.onChange();

    map.addControl(this.controlloLayer);


  }
}
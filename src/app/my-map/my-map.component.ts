import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { API_KEY_BING } from './api-key-bing'
import { vectorStyles } from './vector-styles';





// import 'ol/ol.css';
import Map from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import VectorLayer from 'ol/layer/vector';
import GroupLayer from 'ol/layer/group';
import XYZ from 'ol/source/xyz';
import OSMSource from 'ol/source/osm';
import BingSource from 'ol/source/bingmaps';
import proj from 'ol/proj';
import Attribution from 'ol/attribution';
import Control from 'ol/control/control';
import Style from 'ol/style/style';
import Stroke from 'ol/style/stroke';
import Fill from 'ol/style/fill';
import Circle from 'ol/style/circle';
import VectorSource from 'ol/source/vector';
import geoJsonFormat from 'ol/format/geojson';
import Text from 'ol/style/text';
import TextPlacement from 'ol/style/textplacement'




@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrls: ['./my-map.component.css']
})
export class MyMapComponent implements OnInit {
  controlloLayer: ControlloLayer;
  @ViewChild("selectMappa", { read: ElementRef }) select: ElementRef;


  constructor() { }

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

    let layersPercorsi = [];

    layersPercorsi.push(this.getJsonLayerFromUrl('http://localhost:3000/vector/sentieriUfficiali.json', "SENTIERI_UFFICIALI"));
    layersPercorsi.push(this.getJsonLayerFromUrl('http://localhost:3000/vector/piste.json', "PISTE"));
    layersPercorsi.push(this.getJsonLayerFromUrl('http://localhost:3000/vector/strade.json', "STRADE"));
    layersPercorsi.push(this.getJsonLayerFromUrl('http://localhost:3000/vector/traccia.json', "TRACCE"));
    layersPercorsi.push(this.getJsonLayerFromUrl('http://localhost:3000/vector/tracceImboscate.json', "IMBOSCATE"));
    layersPercorsi.push(this.getJsonLayerFromUrl('http://localhost:3000/vector/viandante.json', "VIANDANTE"));

    layersMap.overlaysAP["sentieri"]=new GroupLayer({ layers: layersPercorsi });
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




  getFunctionStyle(tipoStrada: string) {
    return function (feature: any) {
      var image = new Circle({
        radius: 5,
        fill: null,
        stroke: new Stroke({ color: 'red', width: 1 })
      });

      let styleForLines = vectorStyles[tipoStrada] ? vectorStyles[tipoStrada] : vectorStyles["SENTIERI_UFFICIALI"];

      if (styleForLines.getText()) {
        styleForLines.getText().setText(feature.getProperties().name)
      }

      var stylesForVector = {
        'Point': new Style({
          image: image
        }),
        'LineString': styleForLines,
        'MultiLineString': styleForLines,
        'MultiPoint': new Style({
          image: image
        }),

      };
      return stylesForVector[feature.getGeometry().getType()];
    }
  }
  getJsonLayerFromUrl(url: string, tipoStrada: string) {
    var vectorSource = new VectorSource({
      // features: (new geoJsonFormat()).readFeatures(geojsonObject),
      format: new geoJsonFormat(),
      url: url,

    });


    return new VectorLayer({
      source: vectorSource,
      minResolution: 0.5,
      maxResolution: 20,
      style: this.getFunctionStyle(tipoStrada)
    });

  }

}


export class ControlloLayer extends Control {
  select;
  constructor(option, private layerMap) {
    super(option);
    this.select = option.element;
  }

  onChange(evento?) {
    var chosenStyle = this.select.value;
  
    Object.keys(this.layerMap.layersPrimariMap).forEach(property => {
      this.layerMap.layersPrimariMap[property].setVisible(property === chosenStyle);
    }, this)

    this.layerMap.overlaysAP["ctr"].setVisible(this.layerMap.layersPrimariMap[chosenStyle].isCtrVisible);
    this.layerMap.overlaysAP["sentieri"].setVisible(this.layerMap.layersPrimariMap[chosenStyle].isSentieriVisible);


  }
}
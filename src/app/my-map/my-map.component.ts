import { Component, OnInit, ViewChild, ElementRef, Self, HostListener } from '@angular/core';
import { API_KEY_BING } from './api-key-bing'
import{Router} from '@angular/router'
import { ControlloLayer } from '../ol-custom/controls/controllo-layer'

import { SentieriLayerService, GEOJESON_SENT_UFF } from '../services/my-map/sentieri-layer.service'
import { PreviewStateService } from '../services/communication/preview-state.service'





// import 'ol/ol.css';
import Map from 'ol/map';
import View from 'ol/view';
import TileLayer from 'ol/layer/tile';
import XYZ from 'ol/source/xyz';
import OSMSource from 'ol/source/osm';
import BingSource from 'ol/source/bingmaps';
import proj from 'ol/proj';
import Attribution from 'ol/attribution';
import SelectInteraction from 'ol/interaction/select';
import { environment } from '../../environments/environment';




const LAYER_ROAD:string ='Road'
const LAYER_AERIAL:string ='Aerial'
const LAYER_AERIAL_LBLS:string ='AerialWithLabels'
const LAYER_ARC_GIS:string ='ArcGIS terrain'
const LAYER_OPEN_TOPO:string ='OpenCycleMap'


@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrls: ['./my-map.component.css'],
  providers: [SentieriLayerService]
})
export class MyMapComponent implements OnInit {
  controlloLayer: ControlloLayer;
  @ViewChild("selectMappa", { read: ElementRef }) select: ElementRef;


  constructor(  
    private sentieriLayerService: SentieriLayerService,
    private router:Router,
    private previewStateService:PreviewStateService ){ }

  private map:Map



  ngOnInit() {



    var attributionArcGIS = new Attribution({
      html: 'Tiles &copy; <a href="http://services.arcgisonline.com/ArcGIS/' +
        'rest/services/World_Topo_Map/MapServer">ArcGIS</a>'
    });

    var attributionAP = new Attribution({
      html: 'Tiles &copy; <a href="http://www.abbadiapasseggiate.altervista.org">ABBADIA PASSEGGIATE</a>'
    });

    var layersPrimariMap: { [property: string]: any } = {};
    layersPrimariMap[LAYER_ROAD] = null;
    layersPrimariMap[LAYER_AERIAL] = null;
    layersPrimariMap[LAYER_AERIAL_LBLS] = null;

    

    var layersMap = {
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
      layer.isCtrVisible = property != LAYER_ROAD;
      layer.isSentieriVisible = true;
      layersPrimariMap[property] = layer;


    });





    layersPrimariMap[LAYER_ARC_GIS] = new TileLayer({
      source: new XYZ({
        attributions: [attributionArcGIS],
        url: 'http://server.arcgisonline.com/ArcGIS/rest/services/' +
          'World_Topo_Map/MapServer/tile/{z}/{y}/{x}'


      })
    })
    layersPrimariMap[LAYER_ARC_GIS].isSentieriVisible = true;
    layers.push(layersPrimariMap[LAYER_ARC_GIS]);

    layersPrimariMap[LAYER_OPEN_TOPO] = new TileLayer({
      source: new OSMSource({
        attributions: [
          new Attribution({
            html:  'Kartendaten: © <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende, SRTM | Kartendarstellung: © <a href="http://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)' 
          })
        ],
        url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
      })
    });
    layers.push(layersPrimariMap[LAYER_OPEN_TOPO]);

    layersMap.overlaysAP["ctr"] = new TileLayer({
      opacity: 0.3,
      minResolution: 0.5,
      maxResolution: 6,
      visible: true,
      source: new XYZ({
        attributions: [attributionAP],
        url: 'http://'+ environment.tileServerName +  '/tiles/trasCTR/{z}/{x}/{-y}.png',
        minZoom: 14,
        maxZoom: 18
      })
    })

    layers.push(layersMap.overlaysAP["ctr"]);


    layersMap.overlaysAP["sentieri"] = this.sentieriLayerService.getSentieri();
    layers.push(layersMap.overlaysAP["sentieri"]);





    var view = new View({
      center: proj.fromLonLat([9.351, 45.89910]),
      zoom: 15
    });
    this.map = new Map({
      target: 'map',
      layers: layers,
      //  9.33645°E,  45.89910°N
      view: view
    });



    this.controlloLayer = new ControlloLayer({ element: this.select.nativeElement }, layersMap);
    this.controlloLayer.onChange();
    this.map.addControl(this.controlloLayer);


    let layerLuoghi = this.sentieriLayerService.getLuoghi();
    this.map.addLayer(layerLuoghi);
    // create a Select interaction and add it to the map
    var select = new SelectInteraction({
      layers: [layerLuoghi],
      style: this.sentieriLayerService.getFunctionStyle(GEOJESON_SENT_UFF)
    });


    this.map.addInteraction(select);

    // use the features Collection to detect when a feature is selected,
    // the collection will emit the add event
    var selectedFeatures = select.getFeatures();
    var self=this;
  
    selectedFeatures.on('add', function (event) {
      var feature = event.target.item(0);
      var locId = feature.getProperties().id;
      self.previewStateService.setState(true);
      self.router.navigate([{ outlets: { luoghiPopup: ['luoghiPrewiew', locId]} }]);
      


    });

    // when a feature is removed, clear the photo-info div
    selectedFeatures.on('remove', function (event) {
      //console.log("ciao")
    });

    this.previewStateService.isOpen$.subscribe(isOpen => 
      {
        if(!isOpen)
        {
          selectedFeatures.clear();
        }
      })


  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    event.target.innerWidth;
    this.map.updateSize();
  }
}
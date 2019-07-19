import { Component, OnInit, ViewChild, ElementRef, Self, HostListener } from '@angular/core';
import { API_KEY_BING } from './api-key-bing'
import{Router} from '@angular/router'


import { SentieriLayerService } from '../services/my-map/sentieri-layer.service'
import { PreviewService } from '../services/communication/preview.service'


import { environment } from '../../environments/environment';


// import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {BingMaps as BingSource, OSM as OSMSource, XYZ  } from 'ol/source';
import {fromLonLat} from 'ol/proj';
import {Feature } from 'ol/Feature';
import {Select as SelectInteraction} from 'ol/interaction';
import {defaults as controlDefaults, Control} from 'ol/control'


import { GeolocControl } from '../ol-custom/controls/geoloc-control';
import { MyAttributionControl } from '../ol-custom/controls/my-attribution-control';
import { LayerControl } from '../ol-custom/controls/layer-control';
import { VectorStyleType } from '../services/my-map/vector-styles';
import { DescReferences } from '../om/desc-references';







const LAYER_ROAD:string ='Road'
const LAYER_AERIAL:string ='Aerial'
const LAYER_AERIAL_LBLS:string ='AerialWithLabels'
const LAYER_ARC_GIS:string ='ArcGIS'
const LAYER_OPEN_TOPO:string ='OpenTopoMap'




@Component({
  selector: 'app-my-map',
  templateUrl: './my-map.component.html',
  styleUrls: ['./my-map.component.css'],
  providers: [SentieriLayerService]
})
export class MyMapComponent implements OnInit {
  geolocControl: GeolocControl;
  attributionControl:MyAttributionControl
  layerControl: LayerControl;

  @ViewChild("geolocBtn", { read: ElementRef, static: true }) 
  geolcationButtonElement: ElementRef;

  @ViewChild("attributionCtrl", { read: ElementRef, static: true }) 
  attributionControlElement: ElementRef;

  @ViewChild("LayerCtrl", { read: ElementRef, static: true }) 
  layerControlElement: ElementRef;





  private map:Map
  


  constructor(  
    private sentieriLayerService: SentieriLayerService,
    private router:Router,
    private previewService:PreviewService ){ }



  ngOnInit() {



    var attributionArcGIS = 'Tiles &copy; <a href="http://services.arcgisonline.com/ArcGIS/' +
         'rest/services/World_Topo_Map/MapServer">ArcGIS</a>';
    var attributionAP ='Tiles &copy; <a href="http://www.abbadiapasseggiate.altervista.org">ABBADIA PASSEGGIATE</a>';
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
          'Kartendaten: © <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende, SRTM | Kartendarstellung: © <a href="http://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)' 
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
        url: environment.protocolName + environment.tileServerName +  '/tiles/trasCTR/{z}/{x}/{-y}.png',
        minZoom: 14,
        maxZoom: 18
      })
    })

    layers.push(layersMap.overlaysAP["ctr"]);


    layersMap.overlaysAP["sentieri"] = this.sentieriLayerService.getSentieri();
    layers.push(layersMap.overlaysAP["sentieri"]);




    
    var view:View = new View({
      center: fromLonLat([9.351, 45.89910]),
      zoom: 15
    });

    let zoomInEl :HTMLElement = document.createElement("i");
    zoomInEl.innerText = "add";
    zoomInEl.className = "material-icons"

    let zoomOutEl :HTMLElement = document.createElement("i");
    zoomOutEl.innerText = "remove";
    zoomOutEl.className = "material-icons"

    let rotateEl :HTMLElement = document.createElement("i");
    rotateEl.innerText = "navigation";
    rotateEl.className = "material-icons"
    
    let controls: Control = controlDefaults(
      {
        attribution:false,
        rotate : true,
        rotateOptions:
        {
          label: rotateEl,
          // autoHide:false, // for always visible
          className:  "ap-control btn btn-outline-primary tras02 my-rot"
        },
        zoom: true,
        zoomOptions : 
        {
          className : "ap-control btn btn-outline-primary tras02 my-zoom",
          zoomInLabel: zoomInEl,
          zoomOutLabel: zoomOutEl
        }
      }
    ).getArray();
    
    (controls[0].element.classList as DOMTokenList).remove("btn", "btn-outline-primary","ol-control", "ol-unselectable");
    (controls[1].element.classList as DOMTokenList).remove("btn", "btn-outline-primary","ol-control", "ol-unselectable");                                
    
    
    
    this.map = new Map({
      controls: controls,
      target: 'map',
      layers: layers,
      view: view
    });


    

    

    var layerLuoghi : VectorLayer = this.sentieriLayerService.getLuoghi();
    this.map.addLayer(layerLuoghi);
    // create a Select interaction and add it to the map
    var select : SelectInteraction= new SelectInteraction({
      layers: [layerLuoghi],
      style: this.sentieriLayerService.getFunctionStyle(VectorStyleType.SentieriUfficiali, true)
    });


    this.map.addInteraction(select);

    // use the features Collection to detect when a feature is selected,
    // the collection will emit the add event
    var selectedFeatures = select.getFeatures();
    var self=this;
  
    selectedFeatures.on('add', function (event) {
      var feature = event.target.item(0);
      var locId = feature.getProperties().id;
      self.previewService.setState(true);
      self.router.navigate([{ outlets: { luoghiPopup: ['luoghiPrewiew', locId]} }]);

    });


    this.previewService.isOpen$.subscribe(isOpen => 
    {
      if(!isOpen)
      {
        selectedFeatures.clear(); 
      }
    })

    this.previewService.newRef$.subscribe(newRef => 
    {
      selectedFeatures.clear();
      this.router.navigate([{ outlets: { luoghiPopup: ['luoghiPrewiew', newRef.id]} }]);

      let luoghiFeatures: Feature[] =layerLuoghi.getSource().getFeatures() as Feature[];
      let newFeature:Feature =luoghiFeatures.find(f=> f.getProperties().id == newRef.id);
      selectedFeatures.push(newFeature);

      let featureCord = newFeature.getGeometry().getCoordinates();
      this.map.getView().setCenter(featureCord);
    });




    this.geolocControl = new GeolocControl({element: this.geolcationButtonElement.nativeElement}, this.map);

    this.attributionControl = new MyAttributionControl({element: this.attributionControlElement.nativeElement}, this.map);
    
    this.layerControl = new LayerControl({ element: this.layerControlElement.nativeElement }, layersMap, this.map)

    this.layerControl.setLayerVisible(LAYER_AERIAL);

  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    event.target.innerWidth;
    this.map.updateSize();
  }
}
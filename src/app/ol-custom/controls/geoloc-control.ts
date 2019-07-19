
import { geolocationStyle } from '../../services/my-map/vector-styles';
import { GeolocationData, GeolocationStatus } from '../../om/geolocation-data';

import {Control} from 'ol/control';
import Geolocation from 'ol/Geolocation';
import Feature from 'ol/Feature';
import {Vector as VectorLayer} from 'ol/layer';
import {Vector as VectorSource} from 'ol/source'
import {Point} from 'ol/geom';
import Map from 'ol/Map';
import View from 'ol/View';


export class GeolocControl extends Control {
    private geolocation: Geolocation;
    geolocationData: GeolocationData;
    private geolocLayer: VectorLayer;
    private originalView : View;

    
    constructor(option,  map:Map) {
        super(option);
        map.addControl(this);
        this.originalView = new View(
          {
            center: map.getView().getCenter(),
            zoom: map.getView().getZoom()
          }
        ); 
        this.setUpGeolocation();
    }

    private setUpGeolocation() {
        // init without tracking, it will be enable from GUI
        let map = super.getMap();
        this.geolocation = new Geolocation({
          tracking: false,
          projection: map.getView().getProjection(),
          enableHighAccuracy: true
        });


        let positionFeature = new Feature();
        positionFeature.setStyle(() => geolocationStyle.POSITION) 
      


     
        this.geolocationData = new GeolocationData(GeolocationStatus.Disabled);
    
  
        this.geolocation.on('change:position', () => {
          if (this.geolocationData.status== GeolocationStatus.ActiveWithError)
            this.manageLocation(true, false)
          var p = this.geolocation.getPosition();
          this.manageMapViewConfiguration();
          positionFeature.setGeometry(p ?
            new Point(p) : null);
        
        });
    
        this.geolocation.on('error', () =>{
          this.manageLocation(true,true);
        })
    
        let accuracyFeature: Feature = new Feature();
     
        this.geolocation.on('change:accuracyGeometry', () => {
          accuracyFeature.setGeometry(this.geolocation.getAccuracyGeometry());
          accuracyFeature.setStyle(() => geolocationStyle.ACCURANCY);
         
        });
        
        this.geolocLayer = new VectorLayer({
          map: map,
          source: new VectorSource({
            features: [positionFeature, accuracyFeature]
          }),
        });
    }

    toggleLocation()
  {
    let isTracking:boolean = this.geolocation.getTracking();
    this.manageLocation(!isTracking);
  }

  private manageLocation(active:boolean, error:boolean = false)
  {
    let locStatus:number
    if(!active){
      locStatus = GeolocationStatus.Disabled;
    }else if (!error){
      locStatus = GeolocationStatus.Active;
    }else{
      locStatus = GeolocationStatus.ActiveWithError;
    }

    let map = super.getMap();
    this.geolocation.setTracking(active);
    this.geolocationData.status = locStatus;
    this.geolocLayer.setVisible(active && !error);
    map.updateSize();

    if(!active)
        this.manageMapViewConfiguration();
    
  }


  private manageMapViewConfiguration()
  {
    let map = super.getMap();
    if (this.geolocationData.status == GeolocationStatus.Disabled)
    {
        map.getView().setCenter(this.originalView.getCenter());
        map.getView().setZoom(this.originalView.getZoom());
    }
    else if (this.geolocationData.status == GeolocationStatus.Active && this.geolocationData.firstActivation)
    {
        map.getView().setCenter(this.geolocation.getPosition());
        map.getView().setResolution(Math.max(this.geolocation.getAccuracy()/256, this.originalView.getResolution()) );
        this.geolocationData.confirmStatus();

    }
  }


}
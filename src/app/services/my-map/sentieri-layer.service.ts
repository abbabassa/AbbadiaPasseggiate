import { Injectable } from '@angular/core';
import { vectorStyles, pointStyles } from './vector-styles';

import {Vector as VectorSource} from 'ol/source';
import {GeoJSON as geoJsonFormat} from 'ol/format';

import {Vector as VectorLayer, Group as GroupLayer} from 'ol/layer';
import { environment } from '../../../environments/environment';


export const  GEOJESON_SENT_UFF = "SENTIERI_UFFICIALI"
export const  GEOJESON_PISTE = "PISTE"
export const  GEOJESON_STRADE = "STRADE"
export const  GEOJESON_TRACCE = "TRACCE"
export const  GEOJESON_IMB = "IMBOSCATE"
export const  GEOJESON_VIANDANTE = "VIANDANTE"
export const GEOJESON_LUOGHI="LUOGHI"


@Injectable()
export class SentieriLayerService {

  constructor() { }




  getFunctionStyle(tipoStrada: string) {
    return function (feature: any) {
      let convPointStyleMap:any = {
        comune:"STAR",
        frazione: "SQUARE",
        luogo: "CIRCLE",
        default: "CIRCLE"
      }

      let styleForLines = vectorStyles[tipoStrada] ? vectorStyles[tipoStrada] : vectorStyles[GEOJESON_SENT_UFF];
      let styleForPoint;

      if (styleForLines.getText()) {
        styleForLines.getText().setText(feature.getProperties().name)
      }

      if(feature.getGeometry().getType()== "Point"){
        styleForPoint= pointStyles[convPointStyleMap[feature.getProperties().style? feature.getProperties().style : "default" ]]
       }

      var stylesForVector = {
        'Point': styleForPoint,
        'LineString': styleForLines,
        'MultiLineString': styleForLines,
        'MultiPoint': styleForPoint,

      };
      return stylesForVector[feature.getGeometry().getType()];
    }
  }
  getJsonLayerFromUrl(url: string, tipoStrada: string) {
    var vectorSource = new VectorSource({
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

  getSentieri(){
    let layersPercorsi = [];

    layersPercorsi.push(this.getJsonLayerFromUrl(environment.protocolName + environment.serverName +'/vector/sentieriUfficiali.json', GEOJESON_SENT_UFF));
    layersPercorsi.push(this.getJsonLayerFromUrl(environment.protocolName + environment.serverName +'/vector/piste.json', GEOJESON_PISTE));
    layersPercorsi.push(this.getJsonLayerFromUrl(environment.protocolName + environment.serverName +'/vector/strade.json', GEOJESON_STRADE));
    layersPercorsi.push(this.getJsonLayerFromUrl(environment.protocolName + environment.serverName +'/vector/traccia.json', GEOJESON_TRACCE));
    layersPercorsi.push(this.getJsonLayerFromUrl(environment.protocolName + environment.serverName +'/vector/tracceImboscate.json', GEOJESON_IMB));
    layersPercorsi.push(this.getJsonLayerFromUrl(environment.protocolName + environment.serverName +'/vector/viandante.json', GEOJESON_VIANDANTE));
    return new GroupLayer({ layers: layersPercorsi });
  }

  getLuoghi():VectorLayer{
    return this.getJsonLayerFromUrl(environment.protocolName+ environment.serverName +'/vector/luoghi.json',GEOJESON_LUOGHI)
  }




}

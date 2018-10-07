import { Injectable } from '@angular/core';
import { vectorStyles, pointStyles } from './vector-styles';

import Style from 'ol/style/style';
import Stroke from 'ol/style/stroke';
import Fill from 'ol/style/fill';
import Circle from 'ol/style/circle';
import VectorSource from 'ol/source/vector';
import geoJsonFormat from 'ol/format/geojson';
import Text from 'ol/style/text';
import TextPlacement from 'ol/style/textplacement'
import VectorLayer from 'ol/layer/vector';
import GroupLayer from 'ol/layer/group';
import { environment } from '../../../environments/environment';


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

      let styleForLines = vectorStyles[tipoStrada] ? vectorStyles[tipoStrada] : vectorStyles["SENTIERI_UFFICIALI"];
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

    layersPercorsi.push(this.getJsonLayerFromUrl(environment.protocolName + environment.serverName +'/vector/sentieriUfficiali.json', "SENTIERI_UFFICIALI"));
    layersPercorsi.push(this.getJsonLayerFromUrl(environment.protocolName + environment.serverName +'/vector/piste.json', "PISTE"));
    layersPercorsi.push(this.getJsonLayerFromUrl(environment.protocolName + environment.serverName +'/vector/strade.json', "STRADE"));
    layersPercorsi.push(this.getJsonLayerFromUrl(environment.protocolName + environment.serverName +'/vector/traccia.json', "TRACCE"));
    layersPercorsi.push(this.getJsonLayerFromUrl(environment.protocolName + environment.serverName +'/vector/tracceImboscate.json', "IMBOSCATE"));
    layersPercorsi.push(this.getJsonLayerFromUrl(environment.protocolName + environment.serverName +'/vector/viandante.json', "VIANDANTE"));
    return new GroupLayer({ layers: layersPercorsi });
  }

  getLuoghi():VectorLayer{
    return this.getJsonLayerFromUrl(environment.protocolName+ environment.serverName +'/vector/luoghi.json',"LUOGHI")
  }




}

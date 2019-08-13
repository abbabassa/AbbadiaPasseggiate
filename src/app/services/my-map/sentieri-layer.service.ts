import { Injectable } from '@angular/core';
import { getVectorStyle, getPointStyle, convertIconName, VectorStyleType } from './vector-styles';
import { Icon } from 'ol/style';

import {Vector as VectorSource} from 'ol/source';
import {GeoJSON as geoJsonFormat} from 'ol/format';

import {Vector as VectorLayer, Group as GroupLayer} from 'ol/layer';
import { environment } from '../../../environments/environment';





@Injectable()
export class SentieriLayerService {

  constructor() { }


  
 

  

  getFunctionStyle(tipoStrada: VectorStyleType, selected : boolean) {
    return function (feature: any, resolution) {
     
      let styleForLines = getVectorStyle(tipoStrada ,resolution, selected) ;
      let styleForPoint;

      if (styleForLines.getText()) {
        styleForLines.getText().setText(feature.getProperties().name)
      }

      if(feature.getGeometry().getType()== "Point"){
        styleForPoint= getPointStyle(feature, resolution, selected)

        
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
  getJsonLayerFromUrl(url: string, tipoStrada: VectorStyleType) {
    var vectorSource = new VectorSource({
      format: new geoJsonFormat(),
      url: url,

    });


    return new VectorLayer({
      source: vectorSource,
      minResolution: 0.5,
      maxResolution: 20,
      style: this.getFunctionStyle(tipoStrada, false)
    });

  }

  getSentieri(){
    let layersPercorsi = [];

    layersPercorsi.push(this.getJsonLayerFromUrl(environment.protocolName + environment.serverName +'/vector/sentieriUfficiali.json', VectorStyleType.SentieriUfficiali));
    layersPercorsi.push(this.getJsonLayerFromUrl(environment.protocolName + environment.serverName +'/vector/piste.json', VectorStyleType.Piste));
    layersPercorsi.push(this.getJsonLayerFromUrl(environment.protocolName + environment.serverName +'/vector/strade.json', VectorStyleType.Strade));
    layersPercorsi.push(this.getJsonLayerFromUrl(environment.protocolName + environment.serverName +'/vector/traccia.json', VectorStyleType.Tracce));
    layersPercorsi.push(this.getJsonLayerFromUrl(environment.protocolName + environment.serverName +'/vector/tracceImboscate.json', VectorStyleType.Imboscate));
    layersPercorsi.push(this.getJsonLayerFromUrl(environment.protocolName + environment.serverName +'/vector/viandante.json', VectorStyleType.Viandante));
    return new GroupLayer({ layers: layersPercorsi });
  }

  getLuoghi():VectorLayer{
    return this.getJsonLayerFromUrl(environment.protocolName+ environment.serverName +'/vector/luoghi.json',VectorStyleType.Luoghi)
  }

  getPercorsi():VectorLayer
  {
    return this.getJsonLayerFromUrl(environment.protocolName+ environment.serverName +'/vector/percorsi.json',VectorStyleType.Percorsi)
  }




}

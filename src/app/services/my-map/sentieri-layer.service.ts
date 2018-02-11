import { Injectable } from '@angular/core';
import { vectorStyles } from './vector-styles';

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


@Injectable()
export class SentieriLayerService {

  constructor() { }




  getFunctionStyle(tipoStrada: string) {
    return function (feature: any) {
      var image = new Circle({
        radius: 5,
        fill: new Fill({color: 'green'}),
        stroke: new Stroke({ color: '#00CC00', width: 1 })
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

    layersPercorsi.push(this.getJsonLayerFromUrl('http://localhost:3000/vector/sentieriUfficiali.json', "SENTIERI_UFFICIALI"));
    layersPercorsi.push(this.getJsonLayerFromUrl('http://localhost:3000/vector/piste.json', "PISTE"));
    layersPercorsi.push(this.getJsonLayerFromUrl('http://localhost:3000/vector/strade.json', "STRADE"));
    layersPercorsi.push(this.getJsonLayerFromUrl('http://localhost:3000/vector/traccia.json', "TRACCE"));
    layersPercorsi.push(this.getJsonLayerFromUrl('http://localhost:3000/vector/tracceImboscate.json', "IMBOSCATE"));
    layersPercorsi.push(this.getJsonLayerFromUrl('http://localhost:3000/vector/viandante.json', "VIANDANTE"));
    return new GroupLayer({ layers: layersPercorsi });
  }

  getLuoghi():VectorLayer{
    return this.getJsonLayerFromUrl('http://localhost:3000/vector/luoghi.json',"LUOGHI")
  }




}

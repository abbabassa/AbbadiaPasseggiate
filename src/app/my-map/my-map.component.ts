import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { API_KEY_BING } from './api-key-bing'
import { inherits } from 'openlayers';

// declare var ol: any;

declare module ol {
  module control {
    class Control {
      constructor(options: any);

    }
  }
  class Attribution {
    constructor(option: any)
  }

  module layer {
    class Tile {
      constructor(option: any)
    }
  }

  module source {
    class BingMaps {
      constructor(option: any)

    }
    class XYZ {
      constructor(option: any)

    }
    class OSM {
      public static ATTRIBUTION: any;
      constructor(option: any)

    }
  }
  class Map {
    constructor(option: any);
    addControl(control: any)
  }
  class View {
    constructor(option: any)
  }
  function inherits(childConstructor: () => any, parentConstructor: () => any): void


  module proj {
    function fromLonLat(array: any[]): any
  }

}



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



    var attributionArcGIS = new ol.Attribution({
      html: 'Tiles &copy; <a href="http://services.arcgisonline.com/ArcGIS/' +
        'rest/services/World_Topo_Map/MapServer">ArcGIS</a>'
    });

    var attributionAP = new ol.Attribution({
      html: 'Tiles &copy; <a href="http://www.abbadiapasseggiate.altervista.org">ABBADIA PASSEGGIATE</a>'
    });
    var styles = [
      'Road',
      'Aerial',
      'AerialWithLabels',
    ];
    var layers = [];




    styles.forEach(stile => {
      layers.push(new ol.layer.Tile({
        visible: false,
        preload: Infinity,
        source: new ol.source.BingMaps({

          key: API_KEY_BING.key,
          imagerySet: stile

        })
      }));
    })

    styles.push('ArcGIS terrain');
    layers.push(new ol.layer.Tile({
      source: new ol.source.XYZ({
        attributions: [attributionArcGIS],
        url: 'http://server.arcgisonline.com/ArcGIS/rest/services/' +
          'World_Topo_Map/MapServer/tile/{z}/{y}/{x}'


      })
    }));

    styles.push('OpenCycleMap');
    layers.push(new ol.layer.Tile({
      source: new ol.source.OSM({
        attributions: [
          new ol.Attribution({
            html: 'Tiles &copy; <a href="http://www.opencyclemap.org/">' +
              'OpenCycleMap</a>'
          }),
          ol.source.OSM.ATTRIBUTION
        ],
        url: 'http://{a-c}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png'
      })
    }));


    layers.push(new ol.layer.Tile({
      source: new ol.source.XYZ({
        attributions: [attributionAP],
        url: 'Tiles/Versione3/{z}/{x}/{-y}.png'
      })
    }));



    var view = new ol.View({
      center: ol.proj.fromLonLat([9.351, 45.89910]),
      zoom: 15
    });
    var map = new ol.Map({
      target: 'map',
      layers: layers,
      view: view
    });

    this.controlloLayer = new ControlloLayer({ element: this.select.nativeElement }, styles, layers);
    this.controlloLayer.onChange();

    map.addControl(this.controlloLayer);



  }



}

export class ControlloLayer extends ol.control.Control {
  select;
  constructor(option, private styles, private layers) {
    super(option);
    this.select = option.element;
  }

  onChange(evento?) {
    var style = this.select.value;
    for (var i = 0, ii = this.styles.length; i < ii; ++i) {
      this.layers[i].setVisible(this.styles[i] === style);
    }
  }
}
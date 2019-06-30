import { ElementRef, DebugElement } from '@angular/core';
import { Map } from 'ol/map';
import {Control} from 'ol/control'
import {Layer} from 'ol/layer'
import {Tile as TileLayer, Group as GroupLayer} from 'ol/layer';
import { debug } from 'util';

export class MyAttributionControl extends Control {
    attribution:string[];
    collapsed:boolean;
    
    
    constructor(option, map: Map) {
        super(option);
        map.addControl(this);

        this.attribution = [];

        let domEl : Element = option.element
        domEl.querySelector("div")


        map.getLayers().forEach((layer, index, array) => 
        {    
            layer.on('change:visible', (e) =>
            {

                let currentLayer : Layer= e.target;

                this.onLayerVisibilityChange(currentLayer, map)
            


            });
            this.onLayerVisibilityChange(layer, map);
        });

    }


    onLayerVisibilityChange(currentLayer : Layer, map : Map)
    {

        // PB [30/06/2019]: this control doesn't work after a build with minimizing process (the contructor name may have changed)
        //                  better check for actual type
        //if(!currentLayer || currentLayer.constructor.name == "LayerGroup")
        if(!currentLayer || (currentLayer instanceof GroupLayer))
        {
            console.log(currentLayer);
            return;

        }
        
    
        let attributionFunc : any =currentLayer.getSource().getAttributions();
        if (!attributionFunc )
            return;

        
        let currentAttr : string[] =attributionFunc(
            {
                extent: map.getView().calculateExtent(),
                viewState: map.getView().getState()
            });
        
        // se passa da visibile a non visibile

        
        currentAttr.forEach( el => 
            {
                let index = this.attribution.indexOf(el);

                // se layer visibile aggiungo solo se non c'è già
                if(currentLayer.getVisible() && index == -1)
                {
                    this.attribution.push(el);
                }else if(!currentLayer.getVisible() && index >= 0)
                {
                    this.attribution.splice(index,1);
                }
            })
    }

    toggleCollapsed()
    {
        this.collapsed = !this.collapsed ;
    }
}
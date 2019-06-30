import {Control }from 'ol/control';
import Map from 'ol/Map';

export class LayerControl extends Control {
    select;
    collapsed;
    public get layerMap()
    {
        return this._layerMap;
    }

    public get visibleLayersKeys():string[]
    {
        return Object.keys(this._layerMap.layersPrimariMap);
    }

    private _activeLayerKey:string
    public get activeLayerKey():string
    {
        return this._activeLayerKey;
    }
    constructor(option, private _layerMap, map:Map) {
        super(option);
        this.select = option.element;
        map.addControl(this);
    }

    setLayerVisible(chosenStyle: string) {
    
        this._activeLayerKey = chosenStyle;
        Object.keys(this.layerMap.layersPrimariMap).forEach(property => {
            this.layerMap.layersPrimariMap[property].setVisible(property === chosenStyle);
        }, this)

        if (this.layerMap.overlaysAP) {
            this.layerMap.overlaysAP["ctr"].setVisible(this.layerMap.layersPrimariMap[chosenStyle].isCtrVisible);
            this.layerMap.overlaysAP["sentieri"].setVisible(this.layerMap.layersPrimariMap[chosenStyle].isSentieriVisible);
        }

    }

    toggleCollapsed()
    {
        this.collapsed = !this.collapsed;
    }
}
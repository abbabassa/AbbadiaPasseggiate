import {Control }from 'ol/control';

export class ControlloLayer extends Control {
    select;
    constructor(option, private layerMap) {
        super(option);
        this.select = option.element;
    }

    onChange(evento?) {
        var chosenStyle = this.select.value;

        Object.keys(this.layerMap.layersPrimariMap).forEach(property => {
            this.layerMap.layersPrimariMap[property].setVisible(property === chosenStyle);
        }, this)

        if (this.layerMap.overlaysAP) {
            this.layerMap.overlaysAP["ctr"].setVisible(this.layerMap.layersPrimariMap[chosenStyle].isCtrVisible);
            this.layerMap.overlaysAP["sentieri"].setVisible(this.layerMap.layersPrimariMap[chosenStyle].isSentieriVisible);
        }

    }
}
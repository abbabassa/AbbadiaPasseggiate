import Style from 'ol/style/style';
import Stroke from 'ol/style/stroke';
import Fill from 'ol/style/fill';
import Text from 'ol/style/text';
import TextPlacement from 'ol/style/textplacement'


export const vectorStyles = {
    SENTIERI_UFFICIALI: new Style({
        stroke: new Stroke({
            color: 'red',
            width: 4,
            lineDash: [8, 10]
        }),
        text: new Text({
            font: "14px sans-serif",
            placement: TextPlacement.LINE,
            fill: new Fill({
                color: 'white'
            }),
            stroke: new Stroke({
                color: 'black',
                width: 3,

            }),
        })
    }),
    VIANDANTE: new Style({
        stroke: new Stroke({
            color: [255, 102, 204],
            width: 4,
            lineDash: [8, 10]
        }),
        text: new Text({
            font: "14px sans-serif",
            placement: TextPlacement.LINE,
            fill: new Fill({
                color: 'white'
            }),
            stroke: new Stroke({
                color: 'black',
                width: 3,

            }),
        })
    }),

    STRADE: new Style({
        stroke: new Stroke({
            color: [196, 196, 196],
            width: 7,
        }),
        text: new Text({
            font: "14px sans-serif",
            placement: TextPlacement.LINE,
            fill: new Fill({
                color: 'white'
            }),
            stroke: new Stroke({
                color: 'black',
                width: 3,

            }),
        })
    }),
    PISTE: new Style({
        stroke: new Stroke({
            color: [80, 40, 0],
            width: 6,
        }),
        text: new Text({
            font: "14px sans-serif",
            placement: TextPlacement.LINE,
            fill: new Fill({
                color: 'white'
            }),
            stroke: new Stroke({
                color: 'black',
                width: 3,

            }),
        })
    }),
    TRACCE: new Style({
        stroke: new Stroke({
            color: [102, 51, 0],
            width: 3,
            lineDash: [5, 10]
        })
    }),
    IMBOSCATE: new Style({
        stroke: new Stroke({
            color: [256, 196, 0],
            width: 2,
            lineDash: [5, 10]
        })
    }),


}
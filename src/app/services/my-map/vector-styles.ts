
import TextPlacement from 'ol/style/TextPlacement'
import RegularShape from 'ol/style/RegularShape'


import {Style, Stroke, Fill, Text, Circle} from  'ol/style';


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
    LUOGHI: new Style({
        image: new RegularShape({
          fill: new Fill({color: 'red'}),
          stroke: new Stroke({color: 'black', width: 2}),
          points: 5,
          radius: 10,
          radius2: 4,
          angle: 0
        })
    })

    


}

var stroke =   new Stroke({ color: '#004000', width: 2 });
var fill =new Fill({color: '#33CC66'});

export const pointStyles = {
    CIRCLE :  new Style({
        image: new Circle({
            radius: 10,
            fill: new Fill({color: '#33CC66'}),
            stroke: new Stroke({ color: '#004000', width: 2 })
        })
    }),
    SQUARE: new Style({
        image: new RegularShape({
        fill: fill,
        stroke: stroke,
        points: 4,
        radius: 12,
        angle: Math.PI / 4
        })
    }),
    TRIANGLE: new Style({
        image: new RegularShape({
        fill: fill,
        stroke: stroke,
        points: 3,
        radius: 10,
        rotation: Math.PI / 4,
        angle: 0
        })
    }),
    STAR : new Style({
        image: new RegularShape({
        fill: fill,
        stroke: stroke,
        points: 5,
        radius: 15,
        radius2: 7,
        angle: 0
        })
    }),
    CROSS: new Style({
        image: new RegularShape({
        fill: fill,
        stroke: stroke,
        points: 4,
        radius: 10,
        radius2: 0,
        angle: 0
        })
    }),
    X: new Style({
        image: new RegularShape({
        fill: fill,
        stroke: stroke,
        points: 4,
        radius: 10,
        radius2: 0,
        angle: Math.PI / 4
        })
    })
};


export const geolocationStyle = {
    ACCURANCY : new Style({
        fill: new Fill({
            color: 'rgba(0, 0, 255, 0.2)'
        })
    }),
    POSITION :   new Style({
        image: new Circle({
            radius: 6,
            fill: new Fill({
                color: '#3399CC'
            }),
            stroke: new Stroke({
                color: '#fff',
                width: 2
            })
        })
    })
}
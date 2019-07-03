
import TextPlacement from 'ol/style/TextPlacement'
import RegularShape from 'ol/style/RegularShape'


import {Style, Stroke, Fill, Text, Circle, Icon} from  'ol/style';




export enum FontSizes
{
    Small,
    Medium,
    Big
}


export enum FontWeights
{
     Default,
     Italic,
     Bold
}
function getFont(size:FontSizes, weight:FontWeights = FontWeights.Default)
{
    var fontType= "sans-serif"
    var sizeConcat ="";
    var weightConcat ="";

    switch(size){
        case FontSizes.Small:
            sizeConcat += "14px ";
            break;
        case FontSizes.Medium:
            sizeConcat += "16px ";
            break;
        case FontSizes.Big:
            sizeConcat += "20px ";
            break;
    }


    switch(weight)
    {
        case FontWeights.Bold:
            weightConcat += "bold ";
            break;
        case FontWeights.Italic:
            weightConcat += "italic ";
            break;
        case FontWeights.Default:
            weightConcat += " ";
            break;
    }

    return weightConcat +  sizeConcat + fontType 
}


export function convertIconName(GeoJSONIconName : string): string
{
    let map =
    {
      "peak": "assets/icons/material-design-icons/baseline-terrain-24px.svg",
      "cascata" : "assets/icons/material-design-icons/baseline-terrain-24px.svg",
      "rifugio": "assets/icons/material-design-icons/baseline-home-24px.svg",
      "museo": "assets/icons/material-design-icons/baseline-home-24px.svg",
      "vista": "assets/icons/material-design-icons/baseline-terrain-24px.svg"


    }

    return map[GeoJSONIconName];
}


export const vectorStyles = {
    SENTIERI_UFFICIALI: new Style({
        stroke: new Stroke({
            color: 'red',
            width: 4,
            lineDash: [8, 10]
        }),
        text: new Text({
            font: getFont(FontSizes.Small),
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
            font: getFont(FontSizes.Small),
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
            font: getFont(FontSizes.Small),
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
            font: getFont(FontSizes.Small),
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
       
        text: new Text({
            font: getFont(FontSizes.Small),
            // placement: TextPlacement.LINE,
            fill: new Fill({
                color: 'white'
            }),
            stroke: new Stroke({
                color: 'black',
                width: 3,

            }),
            offsetY: 16
        })
    }),
    SQUARE: new Style({
        
        text: new Text({
            font: getFont(FontSizes.Medium),
            // placement: TextPlacement.LINE,
            fill: new Fill({
                color: 'white'
            }),
            stroke: new Stroke({
                color: 'black',
                width: 3,

            }),
        })
    }),
   
    STAR : new Style({
      
        text: new Text({
            font: getFont(FontSizes.Big),
            // placement: TextPlacement.LINE,
            fill: new Fill({
                color: 'white'
            }),
            stroke: new Stroke({
                color: 'black',
                width: 4,

            }),
        })
    }),
   
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
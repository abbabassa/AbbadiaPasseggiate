
import TextPlacement from 'ol/style/TextPlacement'
import RegularShape from 'ol/style/RegularShape'


import {Style, Stroke, Fill, Text, Circle, Icon} from  'ol/style';
import { stringify } from 'querystring';




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


export enum VectorStyleType
{
    SentieriUfficiali,
    Piste,
    Strade,
    Tracce,
    Imboscate,
    Viandante,
    Luoghi,
    Percorsi
}


export const ICON_TYPE_PEAK = "peak";
export const ICON_TYPE_WATERFALL = "cascata";
export const ICON_TYPE_HUT = "rifugio";
export const ICON_TYPE_MUSEUM = "museo";
export const ICON_TYPE_VIEWSIGHT = "vista";


export const LOC_TYPE_COMUNE = "comune";
export const LOC_TYPE_FRAZIONE = "frazione";
export const LOC_TYPE_LUOGO = "luogo";


export function convertIconName(GeoJSONIconName : string): string
{
    let map = {};

    map[ICON_TYPE_PEAK] = "assets/icons/material-design-icons/baseline-terrain-24px.svg";
    map[ICON_TYPE_WATERFALL] =  "assets/icons/map-icons/waterfall.svg";
    map[ICON_TYPE_HUT] = "assets/icons/material-design-icons/baseline-home-24px.svg";
    map[ICON_TYPE_MUSEUM] ="assets/icons/map-icons/museum.svg";
    map[ICON_TYPE_VIEWSIGHT] = "assets/icons/map-icons/viewpoint.svg";


    

    // if(!map[GeoJSONIconName])
    // {
    //     map[GeoJSONIconName] = map["peak"];
    // }
    return map[GeoJSONIconName];
}

export class BootstrapTheme
{
    private static _instance : BootstrapTheme;
    public static get Instance(): BootstrapTheme
    {
        if(!this._instance )
            BootstrapTheme.computeStyles();    
        return this._instance;
        
    }

    public primary : string;
    public secondary : string;
    public success : string;
    public info : string;
    public warning : string;
    public danger : string;
    public light : string;
    public dark : string;

    private constructor (){}

    public static GetRGBA(color: string, opacity:number =1) : number[]
    {
        color = color.trim();
         let pattern : RegExp =  /^#([A-Fa-f0-9]{6})$/ ;
         if(!color.match(pattern))
            return [0, 0,0, opacity];
        color = color.replace("#", "");
        let result : number[] = [];
        result.push(parseInt( color.substr(0,2), 16));
        result.push(parseInt( color.substr(2,2), 16));
        result.push(parseInt( color.substr(4,2), 16)); 
        result.push( opacity); 
        return result;

    }
    private static  computeStyles(): void
    {
        var style = getComputedStyle(document.body);

        this._instance = new BootstrapTheme();
        this._instance.primary = style.getPropertyValue('--primary');
        this._instance.secondary = style.getPropertyValue('--secondary');
        this._instance.success = style.getPropertyValue('--success');
        this._instance.info = style.getPropertyValue('--info');
        this._instance.warning = style.getPropertyValue('--warning');
        this._instance.danger = style.getPropertyValue('--danger');
        this._instance.light = style.getPropertyValue('--light');
        this._instance.dark = style.getPropertyValue('--dark');

        
    }
}


export function getVectorStyle(styleType:VectorStyleType, resolution, selected: boolean )
{
    let style : Style = new Style({});
    switch(styleType)
    {
        case VectorStyleType.SentieriUfficiali:
            style = new Style({
                stroke: new Stroke({
                    color: 'red',
                    width: resolution < 10? 4 :3,
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
                        width: resolution < 10 ? 3: 2,
            
                        }),
                    })
                });
            break;
        case VectorStyleType.Viandante:
            style = new Style({
                stroke: new Stroke({
                    color: [255, 102, 204],
                    width: resolution < 10? 4 :3,
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
                        width: resolution < 10 ? 3: 2,
        
                        }),
                    })
                });
            break;
        case VectorStyleType.Strade:
            style = new Style({
                stroke: new Stroke({
                    color: [196, 196, 196],
                    width: resolution < 10? 7 :5,
                }),
                text: new Text({
                    font: getFont(FontSizes.Small),
                    placement: TextPlacement.LINE,
                    fill: new Fill({
                        color: 'white'
                    }),
                    stroke: new Stroke({
                        color: 'black',
                        width: resolution < 10 ? 3: 2,
        
                        }),
                    })
                });
            break;

        case VectorStyleType.Piste:
            style=new Style({
                stroke: new Stroke({
                    color: [80, 40, 0],
                    width: resolution < 10? 6 :4,
                }),
                text: new Text({
                    font: getFont(FontSizes.Small),
                    placement: TextPlacement.LINE,
                    fill: new Fill({
                        color: 'white'
                    }),
                    stroke: new Stroke({
                        color: 'black',
                        width: resolution < 10 ? 3: 2,
        
                        }),
                    })
                });
            break;
        case VectorStyleType.Tracce:
            if (resolution < 10)
            {
                style = new Style({
                    stroke: new Stroke({
                        color: [102, 51, 0],
                        width: 3,
                        lineDash: [5, 10]
                        })
                    });
            }
           
            break;
        case VectorStyleType.Imboscate:
            if(resolution < 8)
            {
                style = new Style({
                    stroke: new Stroke({
                        color: [256, 196, 0],
                        width: 2,
                        lineDash: [5, 10]
                        })
                    });
            }
     
           
            break;
        case VectorStyleType.Percorsi:
            let colorStyle = BootstrapTheme.GetRGBA(BootstrapTheme.Instance.primary, 0.5);
            if(selected)
                colorStyle[3] = 1;
            style = new Style({
                stroke: new Stroke({
                    color: colorStyle,
                    width: resolution < 10? 4 :3,
                    // lineDash: [8, 10]
                }),
                text: new Text({
                    font: getFont(FontSizes.Small),
                    placement: TextPlacement.LINE,
                    fill: new Fill({
                        color: 'white'
                    }),
                    stroke: new Stroke({
                        color: 'black',
                        width: resolution < 10 ? 3: 2,
            
                        }),
                    })
                });
            break;


        case VectorStyleType.Luoghi:
            style = new Style({
                image: new RegularShape({
                  fill: new Fill({color: 'red'}),
                  stroke: new Stroke({color: 'black', width: 2}),
                  points: 5,
                  radius: 10,
                  radius2: 4,
                  angle: 0
                    })
                });
            break;


    }
    return style;

}



export function getPointStyle(feature, resolution, selected : boolean) : string
{
    let style : Style;

    let luogo = feature.getProperties().style
    if (luogo == LOC_TYPE_COMUNE)
    {
        style = new Style({
      
            text: new Text({
                font: getFont(FontSizes.Big),
                fill: new Fill({
                    color: 'white'
                }),
                stroke: new Stroke({
                    color: 'black',
                    width: 4,
    
                    }),
                })
            });
        
    }
    else if (luogo == LOC_TYPE_FRAZIONE)
    {
        style = new Style({
        
            text: new Text({
                font: getFont(FontSizes.Medium),
                fill: new Fill({
                    color: 'white'
                }),
                stroke: new Stroke({
                    color: 'black',
                    width: 3,
    
                    }),
                })
            });

    }
    else 
    {
        style = new Style({
       
            text: new Text({
                font: getFont(FontSizes.Small),
                fill: new Fill({
                    color: 'white'
                }),
                stroke: new Stroke({
                    color: 'black',
                    width: 3,
    
                }),
                offsetY: 16
                })
            });
    }

    

   
   
    if(resolution < 10 || luogo == LOC_TYPE_COMUNE  )
        style.getText().setText(feature.getProperties().name);
    else
        style.getText().setText("");


    let imageName:string = convertIconName(feature.getProperties().icon );
    if (imageName && resolution <10)
    {
        let icon = new Icon({
        src: imageName,
        color: 'white',
        scale : resolution < 8? 1.15 : 0.8,
        anchor: [0.5, 0.7]
        })
        style.setImage(icon);
    }
    else 
        style.setImage(null);

    

    if (selected)
    {
        let oldWidth =style.getText().getStroke().getWidth();
        style.getText().getStroke().setWidth(oldWidth * 1.5);
        style.getText().getStroke().setColor("#004000");
    }

    return style;

}



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
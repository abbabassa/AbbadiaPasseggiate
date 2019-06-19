import { Pipe, PipeTransform } from '@angular/core';
import { APImageData, APImageTypes } from '../om/imgData';
import { environment } from  '../../../src/environments/environment';

@Pipe({
  name: 'imgUrl'
})
export class ImgUrlPipe implements PipeTransform {

  transform(value: APImageData, maxSize:boolean =false): string {
    let imgFolder="img"
    switch(value.type)
    {
        case APImageTypes.small:   
            return environment.protocolName + environment.serverName +'/' + imgFolder + '/small/' + value.photoname + "." + value.ext;
        case APImageTypes.big:
            return environment.protocolName + environment.serverName +'/' + imgFolder +'/big/' + value.photoname + "." + value.ext;
        case APImageTypes.bigAndSmall:
            if(maxSize)
            {
                return environment.protocolName + environment.serverName +'/' + imgFolder  +'/big/' + value.photoname + "." + value.ext;
            }else
            {
                return environment.protocolName + environment.serverName +'/' + imgFolder  +'/small/' + value.photoname + "." + value.ext;
            }
        default:
            return '';

    }
  }

}

import { Injectable} from '@nestjs/common';
import { Response } from 'express';
import { ResponseModel } from '../models/responce.model';

@Injectable()
export class UtilityService {
    
    convertFbObjectToArray(obj: Object): Array<any> {
        let data: Array<any> = [];

        for (let key in obj) {
            if (key != "$key") {
                let objData: Object = {};
                objData = obj[key];
                objData["Key"] = key;
                data.push(objData);
               
            }
        }
        return data;
    }

    getTodaysDate(): string {
        let mm;
        let yy = (new Date().getFullYear()).toString();
        let dd;
        if ((new Date().getMonth()) + 1 < 10) {
            // mm = ("0" + ((new Date().getMonth()) + 1)).toString();
            mm = ("0" + (((new Date()).getMonth()) + 1)).toString();
        } else {
            mm = ((new Date().getMonth()) + 1).toString();
        }

        if (new Date().getDate() < 10) {
            dd = ("0" + new Date().getDate()).toString();
        } else {
            dd = (new Date().getDate()).toString();
        }
        return yy + "-" + mm + "-" + dd;
    }
}

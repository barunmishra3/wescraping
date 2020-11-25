import { Injectable} from '@nestjs/common';
import { Response } from 'express';
import { ResponseModel } from '../models/responce.model';

@Injectable()
export class ResponseService {
    errorResponse(status: number, message: string, res: Response){
        const errorDto: ResponseModel = {
            status: status,
            message: message,
            data: null,
            type: 'FAILURE'
        };
        return res.status(status).json(errorDto);
    }

    successResponse(status: number, message: string, data: any, res: Response){
        const responseDto: ResponseModel = {
            status: status,
            message: message,
            data: data,
            type: 'SUCCESS'
        };
        return res.status(status).json(responseDto);
    }
}

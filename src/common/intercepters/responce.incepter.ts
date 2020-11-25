import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { LoggingService } from '../services/logging.service';
import { ResponseService } from '../services/responce.service';

@Injectable()
export class ResponceIntercepter implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler){
    const logger:LoggingService = LoggingService.getLoggingService();
    let res = new ResponseService();
    let ctx = context.switchToHttp();
    let response = ctx.getResponse();    
    let request = ctx.getRequest();
    return next.handle().pipe(map(respData =>{
      logger.success(`Success  ${request.path}`,{
        requestPayload:request.body,
        responceDetails :respData.data
      })
      res.successResponse(200,respData.messege,respData.data,response);
    }));
  }
}
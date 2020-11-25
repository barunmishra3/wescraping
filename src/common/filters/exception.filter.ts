// Global Exception Filter 

import { ExceptionFilter, Catch, ArgumentsHost, HttpException, ExecutionContext } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggingService } from '../services/logging.service';
import { ResponseService } from '../services/responce.service';


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const logger:LoggingService = LoggingService.getLoggingService();
    let res = new ResponseService();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const err:any = exception.getResponse();
    // if there is any exception happens ,printing the details to log
    logger.error(`error in request ${request.path}`,{
      requestPayload:request.body,
      responceDetails :err
    })
    res.errorResponse(status,err.message,response);
  }
} 
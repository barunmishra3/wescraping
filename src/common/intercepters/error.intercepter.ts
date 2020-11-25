import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    BadGatewayException,
    CallHandler,
    NotFoundException,
    HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Request, Response } from 'express';


@Injectable()  
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next
      .handle()
      .pipe(
        catchError(err=>
          this.handle(context,err)
        ),
      );
  }
  handle(context:any,err):Observable<never>{
    const ctx:any = context.switchToHttp();
    const request = ctx.getRequest(); 
    return throwError(err);
  }
  }
  
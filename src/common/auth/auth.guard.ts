import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException, 
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly reflector: Reflector){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // chacking weather auth is applicable or not for the requesting controller
    const exclude = this.reflector.get<[boolean]>('auth', context.getHandler());
    if(exclude != undefined && exclude[0]){
      return true
     
    }else{
       //based on the request data we can validate
       const request = context.switchToHttp().getRequest();
    
       //Authentication logic should be there.
      throw new UnauthorizedException();
    }
    

  }
}
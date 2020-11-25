
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/exception.filter';
import { ErrorsInterceptor } from './common/intercepters/error.intercepter';
import { ResponceIntercepter } from './common/intercepters/responce.incepter';
import { AuthGuard } from './common/auth/auth.guard';
import { WebscrapModule } from './modules/webscrap/webscrap.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV,
    }),
    WebscrapModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponceIntercepter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor

    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter

    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule { }

// I am using Winston with stack driver for logging. 

const winston = require('winston');
const {LoggingWinston} = require('@google-cloud/logging-winston');


export class LoggingService {
    private static logger:any = {};
    private static loggingObj:LoggingService = null;
    private constructor(){};


    static getLoggingService(){
      if(LoggingService.loggingObj == null){
        const loggingWinston = new LoggingWinston();
        LoggingService.loggingObj = new LoggingService();
        LoggingService.logger = winston.createLogger({
          level: 'info',
          transports: [
            new winston.transports.Console(),
            // Add Stackdriver Logging
            loggingWinston,
          ],
        });
      }
      return LoggingService.loggingObj;
    }
    error(msg,data){
      LoggingService.logger.error(msg,data);
    }
    success(msg,data){
      LoggingService.logger.info(msg,data)
    }
    
}
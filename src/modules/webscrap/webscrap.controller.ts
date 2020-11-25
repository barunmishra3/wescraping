import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger/dist';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { ExcludeAuth } from '../../common/decorators/excludeauth.decorator';
import { WebScrapModel } from './dto/webscrap.model';
import { WebScrapFasade } from './webscrap.facade';

@Controller("webscrap")
@ApiTags('Web Scraping')
export class WebscrapController { 
    constructor(private readonly webScrap:WebScrapFasade){

    }
    
    @Get()
    async getWebScraping(){
        return await this.webScrap.getWebScrap();
    }

    @ExcludeAuth(true)
    @Post()
    @ApiQuery({ name: 'params',required:false })
    async makeWebScrap(@Body()details:WebScrapModel,@Query("params")params:string){
        return await this.webScrap.makeWebScrap(details,params);
    }
}

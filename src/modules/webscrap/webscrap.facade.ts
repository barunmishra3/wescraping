import { Injectable } from "@nestjs/common";
import { WebScrapModel } from "./dto/webscrap.model";
import { WebscrapService } from "./webscrap.service";

@Injectable()
export class WebScrapFasade{
    constructor(private readonly scrap:WebscrapService){}
    async getWebScrap(){
        return {
            data:{
                name:"hiiiii"
            },
            message:"WebScraping Successful..."
        }
    }
    async makeWebScrap(details:WebScrapModel,params?){
        return {
            data: await this.scrap.makeWebScrap(details,params),
            message:"WebScraping Successful..."
        }
    }
}
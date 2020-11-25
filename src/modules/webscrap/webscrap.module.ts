import { WebscrapService } from './webscrap.service';
import { WebscrapController } from './webscrap.controller';
import { Module } from '@nestjs/common';
import { WebScrapFasade } from './webscrap.facade';

@Module({
    imports: [],
    controllers: [WebscrapController],
    providers: [WebscrapService,WebScrapFasade],
    exports:[WebscrapService]
})
export class WebscrapModule { }

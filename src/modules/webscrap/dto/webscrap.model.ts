import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { IsNotEmpty } from "class-validator";

export class WebScrapModel{
    @ApiProperty()
    @IsNotEmpty()
    url:string;
}
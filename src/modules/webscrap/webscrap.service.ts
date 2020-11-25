import { Injectable } from '@nestjs/common';
import {load,parseHTML} from 'cheerio'
import e from 'express';
import { ProductModel } from './dto/product.model';
const axios = require('axios');
import { WebScrapModel } from './dto/webscrap.model';
@Injectable()
export class WebscrapService { 
    public makeWebScrap(details:WebScrapModel,params?:string){
        return new Promise(async(res,rej)=>{
            let data = [];
            try {
                const webSiteData = (await axios.get(details.url)).data;
                const parseContnt = load(webSiteData);
               
                parseContnt('div.col-12-12 > div > div > div > a').each((index,productRowElements)=>{
                    let product = new ProductModel();
                    if(productRowElements.children.length > 0){
                // checking weather params are  available or not
                        if(params){ 
                            const paramSet:Set<string> = new Set(params.split(","));
                            if(paramSet.has('image')){
                                product.image = this.getProductImage(productRowElements);
                            }
                            if(paramSet.has('name')){
                                product.name = this.getProductName(productRowElements);
                            }
                            if(paramSet.has('price')){
                                product.price = this.getProductPrice(productRowElements);
                            }
                            if(paramSet.has('features')){
                                product.features = this.getProductFeatures(productRowElements);
                            }  
                        }else{
                            product.image = this.getProductImage(productRowElements);
                            product.name = this.getProductName(productRowElements);
                            product.price = this.getProductPrice(productRowElements);
                            product.features = this.getProductFeatures(productRowElements);
                        }
                        
                    }
                    data.push(product);  
                });
                res(data);
            } catch (error) {
               rej(error)
            }
        })
    }

    //******************* checking for product name ***************************

    private getProductName(productRowElements:cheerio.Element):string{
        try {
            return productRowElements.children[1].children[0].children[0].children[0].data;
        } catch (error) {
            return '';
        }
    }

    //****************** checking for product image **************************

    private getProductImage(productRowElements:cheerio.Element):string{
        try {
            const productImageSectionData = productRowElements.children[0].children[0].children[0].children[0].children[0].attribs;
            return productImageSectionData["src"]
        } catch (error) {
            return "";
        }
    }

    //******************** checking for features *******************************

    private getProductFeatures(productRowElements:cheerio.Element):Array<string>{
        try {
            let features = [];
            productRowElements.children[1].children[0].children[2].children[0].children.forEach((eachDescription)=>{
                if(eachDescription.children.length > 0){
                    features.push(eachDescription.children[0].data);
                }
                
            })
            return features;
            } catch (error) {
                return [];
            }
    }

    //******************** checking for Price *******************************
    
    private getProductPrice(productRowElements:cheerio.Element):string{
        try {
            return productRowElements.children[1].children[1].children[0].children[0].children[0].children[0].data;
        } catch (error) {
            return ""
        }
    }
}

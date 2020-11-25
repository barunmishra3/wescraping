export class ProductModel{
    
    name:string;
    image:string;
    price:any;
    features:Array<any>;
    discount?:string
    constructor(){
        this.features = [];
    }
}
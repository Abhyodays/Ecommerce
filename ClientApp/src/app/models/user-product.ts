import { Product } from "./product.model";

export interface UserProduct {
    id?:number,
    product:Product,
    productQuantity:number
}


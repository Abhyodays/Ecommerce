import { Product } from "./product.model";

export interface OrderProduct{
    userName: string,
    product: Product,
    orderedOn: string
}

export interface Product {
    id?:number,
    name:string,
    description:string,
    category:string,
    quantity:number,
    price:number,
    discount?:number,
    specifications?:string,
    image?:string
}

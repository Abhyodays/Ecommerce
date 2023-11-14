import { Product } from "./product.model";

export interface ProductPagination {
    products: Product[],
    totalPages: number
}

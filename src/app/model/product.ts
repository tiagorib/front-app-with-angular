import { Category } from './category';
export interface Product {
    idProduct?: any;
    nameProduct: string;
    descriptionProduct: string;
    costPriceProduct: string;
    amountProduct: string;
    dateCreatedProduct: any;
    idCategory: any;
    category: Category
}
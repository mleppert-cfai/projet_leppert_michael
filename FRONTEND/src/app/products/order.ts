import { Product } from "shared/models/product";

export class Order {
    id_order!: number;
    orderDate!: Date;
    list_products!: Product[];
  }
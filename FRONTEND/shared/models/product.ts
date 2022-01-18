export class Product {
    id_product!: number;
    image!: string;
    name!: string;
    price!: number;
    description!: string;    
    fk_category!: string;
    fk_period!: string;
    fk_country!: string;
  }
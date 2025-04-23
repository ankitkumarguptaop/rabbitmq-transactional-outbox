

interface ProductCreated {
    product_id: string;
    name: string;
    description : Date;
  }
  
  export interface ProductCreatedBody {
    uuid: string;
    fired_at: Date;
    product: ProductCreated;
  }
  
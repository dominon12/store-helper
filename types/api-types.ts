export interface Product {
  pk: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface User {
  isAdmin: boolean;
}

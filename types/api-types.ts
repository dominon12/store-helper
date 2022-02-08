export interface Product {
  _id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface User {
  isAdmin: boolean;
}

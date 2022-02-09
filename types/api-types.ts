export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: {
    id: number;
    src: string;
  };
}

export interface User {
  isAdmin: boolean;
}

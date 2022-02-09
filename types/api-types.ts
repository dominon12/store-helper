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
  username: string;
  isAdmin: boolean;
  token: string;
}

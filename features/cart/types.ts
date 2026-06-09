export type CartProduct = {
  id: number;
  title: string;
  price: number;
};

export type CartItem = {
  id: number;
  quantity: number;
  subtotal: number;
  product: CartProduct;
};

export type Cart = {
  items: CartItem[];
  totalItems: number;
  total: number;
};

export type AddCartItemPayload = {
  productId: number;
  quantity: number;
};

export type UpdateCartItemPayload = {
  quantity: number;
};

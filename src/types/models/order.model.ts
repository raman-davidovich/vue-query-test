export interface OrderData {
  category: string;
  product: string;
  price: number;
  quantity: number;
  total: number;
  comment: string;
}

// frontend model for order response
export interface OrderResponse extends OrderData {
  id: number;
  createdAt: string;
}

export interface OrderData {
  category?: string;
  product?: string;
  price?: number;
  quantity?: number;
  total: number;
  comment: string;
}

export interface OrderResponse extends OrderData {
  id: number;
  createdAt: string;
}

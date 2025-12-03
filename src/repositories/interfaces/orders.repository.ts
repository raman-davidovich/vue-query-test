import type { OrderData, OrderResponse } from "@/types/models/order.model";

export interface OrdersRepository {
  submit(
    orderData: OrderData,
    options?: { isError: boolean }
  ): Promise<OrderResponse>;

  get(id: number): Promise<OrderResponse>;

  update(id: number, orderData: OrderData): Promise<OrderResponse>;
}

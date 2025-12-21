import { OrdersRepository } from "../interfaces/orders.repository";
import { OrdersMapper } from "@/mappers/orders.mapper";
import type { OrderData, OrderResponse } from "@/types/models/order.model";
import {
  submitOrderDto,
  getOrderDto,
  updateOrderDto,
  getAllOrdersDto,
} from "@/api/orders";

export class OrdersRepositoryImpl implements OrdersRepository {
  private mapper: OrdersMapper;

  constructor(mapper?: OrdersMapper) {
    this.mapper = mapper ?? new OrdersMapper();
  }

  async submit(
    orderData: OrderData,
    options?: { isError?: boolean }
  ): Promise<OrderResponse> {
    if (options?.isError) {
      throw new Error("Processing order server error");
    }

    const dtoPayload = this.mapper.toDto(orderData);
    const dtoResponse = await submitOrderDto(dtoPayload);
    return this.mapper.toModel(dtoResponse);
  }

  async get(id: number): Promise<OrderResponse> {
    const dtoResponse = await getOrderDto(id);
    return this.mapper.toModel(dtoResponse);
  }

  async update(
    id: number,
    orderData: OrderData,
    options?: { isError?: boolean }
  ): Promise<OrderResponse> {
    if (options?.isError) {
      throw new Error("Updating order server error");
    }

    const dtoPayload = this.mapper.toDto(orderData);
    const dtoResponse = await updateOrderDto(id, dtoPayload);

    return this.mapper.toModel(dtoResponse);
  }

  async getAll(): Promise<OrderResponse[]> {
    const dtoResponse = await getAllOrdersDto();
    return dtoResponse.map((dto) => this.mapper.toModel(dto));
  }
}

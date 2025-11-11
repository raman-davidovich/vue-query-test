import { OrderDataDto, OrderResponseDto } from "@/types/dto/order.dto";
import { OrderData, OrderResponse } from "@/types/models/order.model";

export class OrdersMapper {
  toDto(orderData?: OrderData | null): OrderDataDto {
    return {
      category: orderData?.category ?? null,
      product: orderData?.product ?? null,
      price: orderData?.price ?? null,
      quantity: orderData?.quantity,
      total: orderData?.total,
      comment: orderData?.comment,
    };
  }

  toModel(dto?: OrderResponseDto | null): OrderResponse {
    return {
      id: dto?.id ?? 0,
      createdAt: dto?.createdAt ?? "",
      category: dto?.category ?? undefined,
      product: dto?.product ?? undefined,
      price: dto?.price ?? undefined,
      quantity: dto?.quantity ?? 0,
      total: dto?.total ?? 0,
      comment: dto?.comment ?? "",
    };
  }
}

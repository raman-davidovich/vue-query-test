import type { OrderDataDto, OrderResponseDto } from "@/types/dto/order.dto";

export const submitOrderDto = async (
  orderData: OrderDataDto
): Promise<OrderResponseDto> => {
  await new Promise<void>((resolve) => setTimeout(resolve, 2000));
  if (Math.random() > 0.7) throw new Error("processing order server error");

  return {
    id: Math.floor(Math.random() * 1000),
    ...orderData,
    createdAt: new Date().toISOString(),
  };
};

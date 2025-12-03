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

export const getOrderDto = async (id: number): Promise<OrderResponseDto> => {
  await new Promise<void>((resolve) => setTimeout(resolve, 1000));
  if (Math.random() > 0.9) throw new Error("Fetching order server error");

  // return mock data
  return {
    id,
    category: "Electronics",
    product: "Laptop",
    price: 5000,
    quantity: 1,
    total: 5000,
    comment: "Sample order",
    createdAt: new Date().toISOString(),
  };
};

export const updateOrderDto = async (
  id: number,
  orderData: OrderDataDto
): Promise<OrderResponseDto> => {
  await new Promise<void>((resolve) => setTimeout(resolve, 2000));
  if (Math.random() > 0.7) throw new Error("Updating order server error");

  return {
    id,
    ...orderData,
    createdAt: new Date().toISOString(),
  };
};

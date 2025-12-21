import type { OrderDataDto, OrderResponseDto } from "@/types/dto/order.dto";

let ordersStorage: OrderResponseDto[] = [
  {
    id: 1,
    category: "Electronics",
    product: "Laptop",
    price: 59999,
    quantity: 1,
    total: 59999,
    comment: "Sample order 1",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 2,
    category: "Electronics",
    product: "Smartphone",
    price: 29999,
    quantity: 2,
    total: 59998,
    comment: "Sample order 2",
    createdAt: new Date(Date.now() - 43200000).toISOString(),
  },
  {
    id: 3,
    category: "Clothes",
    product: "T-shirt",
    price: 1999,
    quantity: 5,
    total: 9995,
    comment: "Sample order 3",
    createdAt: new Date().toISOString(),
  },
];

export const submitOrderDto = async (
  orderData: OrderDataDto
): Promise<OrderResponseDto> => {
  await new Promise<void>((resolve) => setTimeout(resolve, 2000));
  if (Math.random() > 0.7) throw new Error("Processing order server error");

  const newOrder: OrderResponseDto = {
    id: Math.floor(Math.random() * 1000),
    ...orderData,
    createdAt: new Date().toISOString(),
  };

  ordersStorage.push(newOrder);

  return newOrder;
};

export const getOrderDto = async (id: number): Promise<OrderResponseDto> => {
  await new Promise<void>((resolve) => setTimeout(resolve, 1000));
  if (Math.random() > 0.9) throw new Error("Fetching order server error");

  const orderFromStorage = ordersStorage.find((order) => order.id === id);

  if (orderFromStorage) {
    return orderFromStorage;
  }

  const ordersMap: Record<number, OrderResponseDto> = {
    1: {
      id: 1,
      category: "Electronics",
      product: "Laptop",
      price: 59999,
      quantity: 1,
      total: 59999,
      comment: "Sample order 1",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    2: {
      id: 2,
      category: "Sport",
      product: "Football ball",
      price: 2999,
      quantity: 2,
      total: 5998,
      comment: "Sample order 2",
      createdAt: new Date(Date.now() - 43200000).toISOString(),
    },
    3: {
      id: 3,
      category: "Clothes",
      product: "T-shirt",
      price: 1999,
      quantity: 5,
      total: 9995,
      comment: "Sample order 3",
      createdAt: new Date().toISOString(),
    },
  };

  // return mock data
  return (
    ordersMap[id] || {
      id,
      category: "Electronics",
      product: "Laptop",
      price: 5000,
      quantity: 1,
      total: 5000,
      comment: "Sample order",
      createdAt: new Date().toISOString(),
    }
  );
};

export const updateOrderDto = async (
  id: number,
  orderData: OrderDataDto
): Promise<OrderResponseDto> => {
  await new Promise<void>((resolve) => setTimeout(resolve, 2000));
  if (Math.random() > 0.7) throw new Error("Updating order server error");

  const updatedOrder: OrderResponseDto = {
    id,
    ...orderData,
    createdAt: new Date().toISOString(),
  };

  const orderIndex = ordersStorage.findIndex((order) => order.id === id);
  if (orderIndex !== -1) {
    ordersStorage[orderIndex] = updatedOrder;
  } else {
    ordersStorage.push(updatedOrder);
  }

  return updatedOrder;
};

export const getAllOrdersDto = async (): Promise<OrderResponseDto[]> => {
  await new Promise<void>((resolve) => setTimeout(resolve, 1000));
  if (Math.random() > 0.9) throw new Error("Fetching orders list server error");

  // return mock data for 3 orders
  return [...ordersStorage].sort((a, b) => {
    const dateA = new Date(a.createdAt || 0).getTime();
    const dateB = new Date(b.createdAt || 0).getTime();
    return dateB - dateA;
  });
};

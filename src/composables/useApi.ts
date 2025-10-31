export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface OrderData {
  category?: string;
  product?: string;
  price?: number;
  quantity: number;
  total: number;
  comment: string;
}

interface OrderResponse extends OrderData {
  id: number;
  createdAt: string;
}

type ProductsByCategory = Record<number, Product[]>;

export const fetchCategories = async (): Promise<Category[]> => {
  await new Promise<void>((resolve) => setTimeout(resolve, 1000));

  if (Math.random() > 0.8) throw new Error("Categories loading error");

  return [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Clothes" },
    { id: 3, name: "Books" },
    { id: 4, name: "Sport" },
  ] as Category[];
};

export const fetchProducts = async (
  categoryId: number | null
): Promise<Product[]> => {
  await new Promise<void>((resolve) => setTimeout(resolve, 800));

  if (Math.random() > 0.9) throw new Error("Products loading error");

  const productsByCategory: ProductsByCategory = {
    1: [
      { id: 101, name: "Smartphone", price: 29999 },
      { id: 102, name: "Laptop", price: 59999 },
      { id: 103, name: "Headphones", price: 4999 },
    ],
    2: [
      { id: 201, name: "T-shirt", price: 1999 },
      { id: 202, name: "Jeans", price: 3999 },
      { id: 203, name: "Coat", price: 7999 },
    ],
    3: [
      { id: 301, name: "Fiction", price: 599 },
      { id: 302, name: "Science book", price: 1299 },
      { id: 303, name: "Children's book", price: 399 },
    ],
    4: [
      { id: 401, name: "Football ball", price: 2999 },
      { id: 402, name: "Dumbbells", price: 1999 },
      { id: 403, name: "Yoga mat", price: 1499 },
    ],
  };

  return productsByCategory[categoryId as keyof ProductsByCategory] || [];
};

export const submitOrder = async (
  orderData: OrderData
): Promise<OrderResponse> => {
  await new Promise<void>((resolve) => setTimeout(resolve, 2000));

  if (Math.random() > 0.7) throw new Error("Processing order server error");

  return {
    id: Math.floor(Math.random() * 1000),
    ...orderData,
    createdAt: new Date().toISOString(),
  } as OrderResponse;
};

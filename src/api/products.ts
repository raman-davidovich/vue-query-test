import type { ProductDto, ProductsDto } from "@/types/dto/product.dto";

type ProductsByCategoryDto = Record<number, ProductDto[]>;

export const fetchProductsDto = async (
  categoryId: number | null
): Promise<ProductsDto> => {
  await new Promise<void>((resolve) => setTimeout(resolve, 800));
  if (Math.random() > 0.9) throw new Error("Products loading error");

  const productsByCategory: ProductsByCategoryDto = {
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

  return {
    products: categoryId ? productsByCategory[categoryId] ?? [] : [],
  };
};

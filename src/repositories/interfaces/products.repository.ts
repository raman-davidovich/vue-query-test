import type { Product } from "@/types/models/product.model";

export interface ProductsRepository {
  get(
    categoryId: number | null,
    options?: { isError: boolean }
  ): Promise<Product[]>;
}

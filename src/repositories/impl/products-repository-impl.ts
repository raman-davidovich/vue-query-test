import { ProductsRepository } from "../interfaces/products.repository";
import { ProductsMapper } from "@/mappers/products.mapper";
import { fetchProductsDto } from "@/api/products";
import type { Product } from "@/types/models/product.model";

export class ProductsRepositoryImpl implements ProductsRepository {
  private mapper: ProductsMapper;

  constructor(mapper?: ProductsMapper) {
    this.mapper = mapper ?? new ProductsMapper();
  }

  async get(
    categoryId: number | null,
    options?: { isError: boolean }
  ): Promise<Product[]> {
    if (options?.isError) {
      throw new Error("Products loading error");
    }

    const dto = await fetchProductsDto(categoryId);
    return this.mapper.toModelList(dto);
  }
}

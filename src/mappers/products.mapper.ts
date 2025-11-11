import { ProductDto, ProductsDto } from "@/types/dto/product.dto";
import { Product } from "@/types/models/product.model";

export class ProductsMapper {
  toModel(dto?: ProductDto | null): Product {
    return {
      id: dto?.id ?? 0,
      name: dto?.name ?? "",
      price: dto?.price ?? 0,
    };
  }

  toModelList(dto?: ProductsDto | ProductDto[] | null): Product[] {
    if (!dto) return [];

    if (Array.isArray(dto)) {
      return dto.map((item) => this.toModel(item));
    }

    const products = dto.products ?? [];
    return products.map((item) => this.toModel(item));
  }
}

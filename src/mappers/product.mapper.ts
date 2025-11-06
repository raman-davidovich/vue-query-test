import { ProductDto, ProductsDto } from "@/types/dto/product.dto";
import { Product } from "@/types/models/product.model";

export function mapProductDto(dto: ProductDto): Product {
  return {
    id: dto.id ?? 0,
    name: dto.name ?? "",
    price: dto.price ?? 0,
  };
}

export function mapProductsDto(dto: ProductsDto | ProductDto[]): Product[] {
  const products = Array.isArray(dto) ? dto : dto.products ?? [];
  return products.map(mapProductDto);
}

import { CategoryDto, CategoriesDto } from "@/types/dto/category.dto";
import { Category } from "@/types/models/category.model";

export function mapCategoryDto(dto: CategoryDto): Category {
  return {
    id: dto.id ?? 0,
    name: dto.name ?? "",
  };
}

export function mapCategoriesDto(
  dto: CategoriesDto | CategoryDto[]
): Category[] {
  const categories = Array.isArray(dto) ? dto : dto.categories ?? [];
  return categories.map(mapCategoryDto);
}

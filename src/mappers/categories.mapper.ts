import { CategoryDto, CategoriesDto } from "@/types/dto/category.dto";
import { Category } from "@/types/models/category.model";

export class CategoriesMapper {
  toModel(dto?: CategoryDto | null): Category {
    return {
      id: dto?.id ?? 0,
      name: dto?.name ?? "",
    };
  }

  toModelList(dto?: CategoriesDto | CategoryDto[] | null): Category[] {
    if (!dto) return [];

    if (Array.isArray(dto)) {
      return dto.map((item) => this.toModel(item));
    }

    const categories = dto.categories ?? [];
    return categories.map((item) => this.toModel(item));
  }
}

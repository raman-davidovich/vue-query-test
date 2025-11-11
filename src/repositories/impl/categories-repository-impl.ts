import { CategoriesRepository } from "../interfaces/categories.repository";
import { CategoriesMapper } from "@/mappers/categories.mapper";
import { fetchCategoriesDto } from "@/api/categories";
import type { Category } from "@/types/models/category.model";

export class CategoriesRepositoryImpl implements CategoriesRepository {
  private mapper: CategoriesMapper;

  constructor(mapper?: CategoriesMapper) {
    this.mapper = mapper ?? new CategoriesMapper();
  }

  async get(options?: { isError: boolean }): Promise<Category[]> {
    if (options?.isError) {
      throw new Error("Categories loading error");
    }

    const dto = await fetchCategoriesDto();
    return this.mapper.toModelList(dto);
  }
}

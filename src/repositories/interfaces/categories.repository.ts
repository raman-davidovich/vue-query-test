import type { Category } from "@/types/models/category.model";

export interface CategoriesRepository {
  get(options?: { isError: boolean }): Promise<Category[]>;
}

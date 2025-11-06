export interface CategoryDto {
  id?: number | null;
  name?: string | null;
}

export interface CategoriesDto {
  categories?: CategoryDto[] | null;
}

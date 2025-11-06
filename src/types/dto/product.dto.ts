export interface ProductDto {
  id?: number | null;
  name?: string | null;
  price?: number | null;
}

export interface ProductsDto {
  products?: ProductDto[] | null;
}

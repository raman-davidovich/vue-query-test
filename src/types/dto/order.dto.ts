export interface OrderDataDto {
  category?: string | null;
  product?: string | null;
  price?: number | null;
  quantity?: number | null;
  total?: number | null;
  comment?: string | null;
}

export interface OrderResponseDto extends OrderDataDto {
  id?: number | null;
  createdAt?: string | null;
}

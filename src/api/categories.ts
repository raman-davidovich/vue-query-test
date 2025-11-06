import type { CategoriesDto } from "@/types/dto/category.dto";

export const fetchCategoriesDto = async (): Promise<CategoriesDto> => {
  await new Promise<void>((resolve) => setTimeout(resolve, 1000));
  if (Math.random() > 0.8) throw new Error("Categories loading error");

  return {
    categories: [
      { id: 1, name: "Electronics" },
      { id: 2, name: "Clothes" },
      { id: 3, name: "Books" },
      { id: 4, name: "Sport" },
    ],
  };
};

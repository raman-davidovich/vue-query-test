import { computed, type Ref, type ComputedRef } from "vue";
import { useQuery } from "@tanstack/vue-query";
import type { Category } from "@/types/models/category.model";
import { categoriesRepository } from "@/repositories/index";

interface SelectOption {
  label: string;
  value: number;
}

interface UseCategoriesReturn {
  categoriesData: Ref<Category[] | undefined>;
  categoriesLoading: Ref<boolean>;
  categoriesHasError: Ref<boolean>;
  categoriesError: Ref<Error | null>;
  categoriesOptions: ComputedRef<SelectOption[]>;
  refetchCategories: () => Promise<any>;
}

export const useCategories = (): UseCategoriesReturn => {
  const categoriesQuery = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: async () => categoriesRepository.get(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const categoriesOptions = computed<SelectOption[]>(
    () =>
      categoriesQuery.data.value?.map((category) => ({
        label: category.name,
        value: category.id,
      })) ?? []
  );

  return {
    categoriesData: categoriesQuery.data,
    categoriesLoading: categoriesQuery.isLoading,
    categoriesHasError: categoriesQuery.isError,
    categoriesError: categoriesQuery.error,
    categoriesOptions,
    refetchCategories: categoriesQuery.refetch,
  };
};

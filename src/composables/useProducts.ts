import { computed, type Ref, type ComputedRef } from "vue";
import { useQuery } from "@tanstack/vue-query";
import type { Product } from "@/types/models/product.model";
import { productsRepository } from "@/repositories/index";

interface SelectOption {
  label: string;
  value: number;
}

interface UseProductsReturn {
  productsData: Ref<Product[] | undefined>;
  productsLoading: Ref<boolean>;
  productsHasError: Ref<boolean>;
  productsError: Ref<Error | null>;
  productsOptions: ComputedRef<SelectOption[]>;
  refetchProducts: () => Promise<any>;
}

export const useProducts = (
  categoryId: Ref<number | null>
): UseProductsReturn => {
  const productsQuery = useQuery<Product[], Error>({
    queryKey: computed(() => ["products", categoryId.value]),
    queryFn: async () => productsRepository.get(categoryId.value),
    enabled: computed(() => !!categoryId.value && categoryId.value !== null),
    staleTime: 2 * 60 * 1000,
  });

  const productsOptions = computed<SelectOption[]>(
    () =>
      productsQuery.data.value?.map((product) => ({
        label: `${product.name} - ${product.price} rub.`,
        value: product.id,
      })) ?? []
  );

  return {
    productsData: productsQuery.data,
    productsLoading: productsQuery.isLoading,
    productsHasError: productsQuery.isError,
    productsError: productsQuery.error,
    productsOptions,
    refetchProducts: productsQuery.refetch,
  };
};

import { ref, type Ref } from "vue";
import { useQueryClient, type QueryClient } from "@tanstack/vue-query";

interface UseCacheReturn {
  allCachedProducts: Ref<number>;
  isRefreshingCache: Ref<boolean>;
  lastCacheUpdate: Ref<string>;
  updateCachedProductsCount: () => void;
  refetchAll: (
    categoryId: number | null,
    refetchCategories: () => Promise<any>,
    refetchProducts: () => Promise<any>
  ) => Promise<void>;
}

type RefetchFunction = () => Promise<any>;

export const useCache = (): UseCacheReturn => {
  const queryClient: QueryClient = useQueryClient();
  const allCachedProducts = ref<number>(0);
  const isRefreshingCache = ref<boolean>(false);
  const lastCacheUpdate = ref<string>(new Date().toLocaleTimeString());

  const updateCachedProductsCount = (): void => {
    const cache = queryClient.getQueryCache();
    const productsQueries = cache.findAll({ queryKey: ["products"] });

    let totalProducts = 0;
    productsQueries.forEach((query) => {
      if (query.state.data && Array.isArray(query.state.data)) {
        totalProducts += query.state.data.length;
      }
    });

    allCachedProducts.value = totalProducts;
  };

  const refetchAll = async (
    categoryId: number | null,
    refetchCategories: RefetchFunction,
    refetchProducts: RefetchFunction
  ): Promise<void> => {
    isRefreshingCache.value = true;

    try {
      await refetchCategories();

      queryClient.removeQueries({ queryKey: ["products"] });

      if (categoryId) {
        await refetchProducts();
      }

      updateCachedProductsCount();

      lastCacheUpdate.value = new Date().toLocaleTimeString();
    } catch (error: unknown) {
      console.error("Updating cache error:", error);
    } finally {
      isRefreshingCache.value = false;
    }
  };

  return {
    allCachedProducts,
    isRefreshingCache,
    lastCacheUpdate,
    updateCachedProductsCount,
    refetchAll,
  };
};

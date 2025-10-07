import { ref, computed, watch } from "vue";
import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { fetchCategories, fetchProducts, submitOrder } from "./useApi.js";

export const useCache = () => {
  const queryClient = useQueryClient();
  const allCachedProducts = ref(0);
  const isRefreshingCache = ref(false);
  const lastCacheUpdate = ref(new Date().toLocaleTimeString());

  const updateCachedProductsCount = () => {
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

  const refetchAll = async (categoryId, refetchCategories, refetchProducts) => {
    isRefreshingCache.value = true;

    try {
      await refetchCategories();

      queryClient.removeQueries({ queryKey: ["products"] });

      if (categoryId) {
        await refetchProducts();
      }

      updateCachedProductsCount();

      lastCacheUpdate.value = new Date().toLocaleTimeString();
    } catch (error) {
      console.error("Ошибка при обновлении кэша:", error);
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

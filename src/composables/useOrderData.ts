import { watch, computed } from "vue";
import { useCategories } from "./useCategories";
import { useProducts } from "./useProducts";
import { useOrderForm } from "./useOrderForm";
import { useOrderMutation } from "./useOrderMutation";
import { useCache } from "./useCache";

export const useOrderData = () => {
  const { form, isFormValid, resetForm } = useOrderForm();
  const categories = useCategories();
  const categoryIdRef = computed(() => form.value.categoryId);
  const products = useProducts(categoryIdRef);
  const cache = useCache();
  const orderMutation = useOrderMutation(() => {
    resetForm();
  });

  watch(
    () => form.value.categoryId,
    (newValue, oldValue) => {
      if (newValue !== oldValue) {
        form.value.productId = null;
      }
    }
  );

  watch(
    [products.productsData, categories.categoriesData],
    () => cache.updateCachedProductsCount(),
    { deep: true }
  );

  cache.updateCachedProductsCount();

  const submit = async (): Promise<void> => {
    await orderMutation.submitOrder(
      form.value,
      products.productsData.value,
      categories.categoriesData.value
    );
  };

  const refetchAllData = async (): Promise<void> => {
    await cache.refetchAll(
      form.value.categoryId,
      categories.refetchCategories,
      products.refetchProducts
    );
  };

  return {
    form,
    categoriesData: categories.categoriesData,
    categoriesLoading: categories.categoriesLoading,
    categoriesHasError: categories.categoriesHasError,
    categoriesError: categories.categoriesError,
    productsData: products.productsData,
    productsLoading: products.productsLoading,
    productsHasError: products.productsHasError,
    productsError: products.productsError,
    mutation: orderMutation.orderMutation,
    allCachedProducts: cache.allCachedProducts,
    isRefreshingCache: cache.isRefreshingCache,
    lastCacheUpdate: cache.lastCacheUpdate,
    categoriesOptions: categories.categoriesOptions,
    productsOptions: products.productsOptions,
    isFormValid,
    submit,
    resetForm,
    refetchAllData,
  };
};

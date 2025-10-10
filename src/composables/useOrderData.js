import { ref, computed, watch } from "vue";
import { useQuery, useMutation } from "@tanstack/vue-query";
import { fetchCategories, fetchProducts, submitOrder } from "./useApi.js";
import { useCache } from "./useCache.js";

export const useOrderData = () => {
  const form = ref({
    categoryId: null,
    productId: null,
    quantity: 1,
    comment: "",
  });

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesHasError,
    error: categoriesError,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  const {
    data: productsData,
    isLoading: productsLoading,
    isError: productsHasError,
    error: productsError,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: computed(() => ["products", form.value.categoryId]),
    queryFn: () => fetchProducts(form.value.categoryId),
    enabled: computed(
      () => !!form.value.categoryId && form.value.categoryId !== null
    ),
    staleTime: 2 * 60 * 1000,
  });

  const mutation = useMutation({
    mutationFn: submitOrder,
    onSuccess: () => {
      resetForm();
    },
  });

  const {
    allCachedProducts,
    isRefreshingCache,
    lastCacheUpdate,
    updateCachedProductsCount,
    refetchAll,
  } = useCache();

  const categoriesOptions = computed(
    () =>
      categoriesData.value?.map((category) => ({
        label: category.name,
        value: category.id,
      })) || []
  );

  const productsOptions = computed(
    () =>
      productsData.value?.map((product) => ({
        label: `${product.name} - ${product.price} rub.`,
        value: product.id,
      })) || []
  );

  const isFormValid = computed(
    () =>
      Boolean(form.value.categoryId) &&
      Boolean(form.value.productId) &&
      form.value.quantity >= 1 &&
      form.value.quantity <= 10
  );

  const resetForm = () => {
    form.value = {
      categoryId: null,
      productId: null,
      quantity: 1,
      comment: "",
    };
  };

  const handleSubmit = () => {
    const selectedProduct = productsData.value?.find(
      (product) => product.id === form.value.productId
    );
    const selectedCategory = categoriesData.value.find(
      (category) => category.id === form.value.categoryId
    );

    const orderData = {
      category: selectedCategory?.name,
      product: selectedProduct?.name,
      price: selectedProduct?.price,
      quantity: form.value.quantity,
      total: selectedProduct ? selectedProduct.price * form.value.quantity : 0,
      comment: form.value.comment,
    };

    mutation.mutate(orderData);
  };

  const handleRefetchAll = () => {
    refetchAll(form.value.categoryId, refetchCategories, refetchProducts);
  };

  watch(
    [productsData, categoriesData],
    () => {
      updateCachedProductsCount();
    },
    { deep: true }
  );

  watch(
    () => form.value.categoryId,
    (newValue, oldValue) => {
      if (newValue !== oldValue) form.value.productId = null;
    }
  );

  updateCachedProductsCount();

  return {
    form,
    categoriesData,
    categoriesLoading,
    categoriesHasError,
    categoriesError,
    productsData,
    productsLoading,
    productsHasError,
    productsError,
    mutation,
    allCachedProducts,
    isRefreshingCache,
    lastCacheUpdate,
    categoriesOptions,
    productsOptions,
    isFormValid,
    resetForm,
    handleSubmit,
    handleRefetchAll,
  };
};

import { ref, computed, watch, type Ref, type ComputedRef } from "vue";
import { useQuery, useMutation } from "@tanstack/vue-query";
import {
  fetchCategories,
  fetchProducts,
  submitOrder,
  type Category,
  type Product,
  type OrderData,
} from "./useApi";
import { useCache } from "./useCache";

interface OrderForm {
  categoryId: number | null;
  productId: number | null;
  quantity: number;
  comment: string;
}

interface SelectOption {
  label: string;
  value: number;
}

export interface UseOrderDataReturn {
  form: Ref<OrderForm>;
  categoriesData: Ref<Category[] | undefined>;
  categoriesLoading: Ref<boolean>;
  categoriesHasError: Ref<boolean>;
  categoriesError: Ref<Error | null>;
  productsData: Ref<Product[] | undefined>;
  productsLoading: Ref<boolean>;
  productsHasError: Ref<boolean>;
  productsError: Ref<Error | null>;
  mutation: ReturnType<typeof useMutation<any, Error, OrderData>>;
  allCachedProducts: Ref<number>;
  isRefreshingCache: Ref<boolean>;
  lastCacheUpdate: Ref<string>;
  categoriesOptions: ComputedRef<SelectOption[]>;
  productsOptions: ComputedRef<SelectOption[]>;
  isFormValid: ComputedRef<boolean>;
  resetForm: () => void;
  handleSubmit: () => void;
  handleRefetchAll: () => void;
}

export const useOrderData = (): UseOrderDataReturn => {
  const form = ref<OrderForm>({
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
  } = useQuery<Category[], Error>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const {
    data: productsData,
    isLoading: productsLoading,
    isError: productsHasError,
    error: productsError,
    refetch: refetchProducts,
  } = useQuery<Product[], Error>({
    queryKey: computed(() => ["products", form.value.categoryId]),
    queryFn: () => fetchProducts(form.value.categoryId),
    enabled: computed(
      () => !!form.value.categoryId && form.value.categoryId !== null
    ),
    staleTime: 2 * 60 * 1000,
  });

  const mutation = useMutation<any, Error, OrderData>({
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

  const categoriesOptions = computed<SelectOption[]>(
    () =>
      categoriesData.value?.map((category: Category) => ({
        label: category.name,
        value: category.id,
      })) || []
  );

  const productsOptions = computed<SelectOption[]>(
    () =>
      productsData.value?.map((product: Product) => ({
        label: `${product.name} - ${product.price} rub.`,
        value: product.id,
      })) || []
  );

  const isFormValid = computed<boolean>(
    () =>
      Boolean(form.value.categoryId) &&
      Boolean(form.value.productId) &&
      form.value.quantity >= 1 &&
      form.value.quantity <= 10
  );

  const resetForm = (): void => {
    form.value = {
      categoryId: null,
      productId: null,
      quantity: 1,
      comment: "",
    };
  };

  const handleSubmit = (): void => {
    const selectedProduct = productsData.value?.find(
      (product: Product) => product.id === form.value.productId
    );
    const selectedCategory = categoriesData.value?.find(
      (category: Category) => category.id === form.value.categoryId
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

  const handleRefetchAll = (): void => {
    refetchAll(form.value.categoryId, refetchCategories, refetchProducts);
  };

  watch(
    [productsData, categoriesData],
    (): void => {
      updateCachedProductsCount();
    },
    { deep: true }
  );

  watch(
    (): number | null => form.value.categoryId,
    (newValue: number | null, oldValue: number | null): void => {
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

import { watch, computed } from "vue";
import { useCategories } from "./useCategories";
import { useProducts } from "./useProducts";
import { useOrderForm } from "./useOrderForm";
import { useOrderMutation } from "./useOrderMutation";
import { useCache } from "./useCache";
import { useOrder } from "./useOrder";

interface UseOrderFormDataProps {
  mode?: "create" | "edit";
  orderId?: number | null;
  initialFormData?: {
    categoryId: number | null;
    productId: number | null;
    quantity: number;
    comment: string;
  };
  onSuccess?: () => void;
}

export const useOrderFormData = (props: UseOrderFormDataProps = {}) => {
  const { mode = "create", orderId = null, initialFormData, onSuccess } = props;

  const { form, isFormValid, resetForm, initializeForm } =
    useOrderForm(initialFormData);

  const categories = useCategories();
  const categoryIdRef = computed(() => form.value.categoryId);
  const products = useProducts(categoryIdRef);
  const cache = useCache();

  const order = useOrder(mode === "edit" ? orderId : null);

  const orderMutation = useOrderMutation(() => {
    if (onSuccess) {
      onSuccess();
    } else if (mode === "create") {
      resetForm();
    }
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

  watch(
    [
      () => order.orderData.value,
      categories.categoriesData,
      products.productsData,
    ],
    ([orderData, categoriesData, productsData]) => {
      if (
        orderData &&
        mode === "edit" &&
        categoriesData &&
        categoriesData.length > 0
      ) {
        const category = categoriesData.find(
          (category) => category.name === orderData.category
        );

        if (category) {
          if (productsData && productsData.length > 0) {
            const product = productsData.find(
              (product) => product.name === orderData.product
            );

            if (product) {
              initializeForm({
                categoryId: category.id,
                productId: product.id,
                quantity: orderData.quantity,
                comment: orderData.comment,
              });
            }
          }
        }
      }
    },
    { immediate: true }
  );

  cache.updateCachedProductsCount();

  const submit = async (): Promise<void> => {
    await orderMutation.submitOrder(
      form.value,
      products.productsData.value,
      categories.categoriesData.value,
      mode === "edit" ? orderId : null
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
    orderLoading: order.orderLoading,
    orderHasError: order.orderHasError,
    orderError: order.orderError,
    resetMutation: orderMutation.resetMutation,
  };
};

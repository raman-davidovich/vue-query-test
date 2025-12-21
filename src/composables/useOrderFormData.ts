import { watch, computed, ref } from "vue";
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

  const { form, isFormValid, resetForm } = useOrderForm(initialFormData);

  const isFormInitialized = ref(false);

  const categories = useCategories();
  const categoryIdRef = computed(() => form.value.categoryId);
  const products = useProducts(categoryIdRef);
  const cache = useCache();

  const currentOrderId = computed(() => (mode === "edit" ? orderId : null));
  const order = useOrder(currentOrderId);

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
    [() => order.orderData.value, categories.categoriesData, () => orderId],
    ([orderData, categoriesData, currentOrderId]) => {
      if (
        orderData &&
        mode === "edit" &&
        categoriesData &&
        categoriesData.length > 0 &&
        orderData.id === currentOrderId
      ) {
        if (isFormInitialized.value && form.value.categoryId) {
          const normalizedOrderCategory = orderData.category
            ?.trim()
            .toLocaleLowerCase();
          const category = categoriesData.find(
            (category) =>
              category.name.trim().toLowerCase() === normalizedOrderCategory
          );

          if (category && form.value.categoryId !== category.id) {
            isFormInitialized.value = false;
          }
        }

        if (!isFormInitialized.value) {
          const normalizedOrderCategory = orderData.category
            ?.trim()
            .toLowerCase();
          const category = categoriesData.find(
            (category) =>
              category.name.trim().toLowerCase() === normalizedOrderCategory
          );

          if (category) {
            form.value.categoryId = category.id;
            form.value.quantity = orderData.quantity;
            form.value.comment = orderData.comment;
            isFormInitialized.value = true;
          }
        }
      }
    },
    { immediate: true }
  );

  watch(
    [
      () => order.orderData.value,
      () => form.value.categoryId,
      products.productsData,
      () => orderId,
      products.productsLoading,
    ],
    ([
      orderData,
      categoryId,
      productsData,
      currentOrderId,
      productsLoading,
    ]) => {
      if (
        orderData &&
        mode === "edit" &&
        categoryId &&
        productsData &&
        productsData.length > 0 &&
        !productsLoading &&
        isFormInitialized.value &&
        orderData.id === currentOrderId
      ) {
        const normalizedOrderProduct = orderData.product?.trim().toLowerCase();
        const product = productsData.find(
          (product) =>
            product.name.trim().toLowerCase() === normalizedOrderProduct
        );

        if (product) {
          if (form.value.productId !== product.id) {
            form.value.productId = product.id;
          }
        } else {
          form.value.productId = null;
        }
      } else if (
        orderData &&
        orderData.id !== currentOrderId &&
        mode === "edit"
      ) {
        form.value.productId = null;
      }
    },
    { immediate: true }
  );

  watch(
    () => orderId,
    (newOrderId, oldOrderId) => {
      if (mode === "edit") {
        if (newOrderId !== oldOrderId) {
          isFormInitialized.value = false;
          resetForm();
          form.value.productId = null;
          form.value.categoryId = null;
          form.value.quantity = 1;
          form.value.comment = "";
        }
      }
    },
    { immediate: false }
  );

  watch(
    [
      () => order.orderData.value,
      () => form.value.categoryId,
      products.productsData,
      products.productsLoading,
      () => orderId,
    ],
    ([
      orderData,
      categoryId,
      productsData,
      productsLoading,
      currentOrderId,
    ]) => {
      if (
        orderData &&
        mode === "edit" &&
        categoryId &&
        productsData &&
        productsData.length > 0 &&
        !productsLoading &&
        isFormInitialized.value &&
        !form.value.productId &&
        orderData.id === currentOrderId
      ) {
        const normalizedOrderProduct = orderData.product?.trim().toLowerCase();
        const product = productsData.find(
          (product) =>
            product.name.trim().toLowerCase() === normalizedOrderProduct
        );

        if (product) {
          form.value.productId = product.id;
        }
      }
    },
    { immediate: true }
  );

  watch(
    () => order.orderData.value?.id,
    (newOrderId, oldOrderId) => {
      if (
        mode === "edit" &&
        newOrderId !== oldOrderId &&
        oldOrderId !== undefined
      ) {
        isFormInitialized.value = false;
      }
    }
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

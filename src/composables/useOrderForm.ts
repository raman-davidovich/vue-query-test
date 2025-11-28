import { ref, computed, watch, type Ref, type ComputedRef } from "vue";

interface OrderFormState {
  categoryId: number | null;
  productId: number | null;
  quantity: number;
  comment: string;
}

interface UseOrderFormReturn {
  form: Ref<OrderFormState>;
  isFormValid: ComputedRef<boolean>;
  resetForm: () => void;
}

export const useOrderForm = (): UseOrderFormReturn => {
  const form = ref<OrderFormState>({
    categoryId: null,
    productId: null,
    quantity: 1,
    comment: "",
  });

  const isFormValid = computed(
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

  return {
    form,
    isFormValid,
    resetForm,
  };
};

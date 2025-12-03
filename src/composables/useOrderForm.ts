import { ref, computed, type Ref, type ComputedRef } from "vue";

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
  initializeForm: (initialData?: Partial<OrderFormState>) => void;
}

export const useOrderForm = (
  initialData?: Partial<OrderFormState>
): UseOrderFormReturn => {
  const form = ref<OrderFormState>({
    categoryId: initialData?.categoryId ?? null,
    productId: initialData?.productId ?? null,
    quantity: initialData?.quantity ?? 1,
    comment: initialData?.comment ?? "",
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

  const initializeForm = (initialData?: Partial<OrderFormState>): void => {
    if (initialData) {
      form.value = {
        categoryId: initialData.categoryId ?? null,
        productId: initialData.productId ?? null,
        quantity: initialData.quantity ?? 1,
        comment: initialData.comment ?? "",
      };
    }
  };

  return {
    form,
    isFormValid,
    resetForm,
    initializeForm,
  };
};

import { useMutation } from "@tanstack/vue-query";
import type { OrderData, OrderResponse } from "@/types/models/order.model";
import { ordersRepository } from "@/repositories/index";

interface UseOrderMutationReturn {
  orderMutation: ReturnType<
    typeof useMutation<OrderResponse, Error, OrderData>
  >;
  submitOrder: (
    form: {
      categoryId: number | null;
      productId: number | null;
      quantity: number;
      comment: string;
    },
    productsData: any[] | undefined,
    categoriesData: any[] | undefined,
    onSuccess?: () => void
  ) => Promise<void>;
}

export const useOrderMutation = (
  onSuccess?: () => void
): UseOrderMutationReturn => {
  const orderMutation = useMutation<OrderResponse, Error, OrderData>({
    mutationFn: async (payload) => ordersRepository.submit(payload),
    onSuccess: onSuccess,
  });

  const submitOrder = async (
    form: {
      categoryId: number | null;
      productId: number | null;
      quantity: number;
      comment: string;
    },
    productsData: any[] | undefined,
    categoriesData: any[] | undefined,
    onSuccessCallback?: () => void
  ): Promise<void> => {
    const selectedProduct = productsData?.find(
      (product) => product.id === form.productId
    );

    const selectedCategory = categoriesData?.find(
      (category) => category.id === form.categoryId
    );

    const payload: OrderData = {
      category: selectedCategory?.name || "",
      product: selectedProduct?.name || "",
      price: selectedProduct?.price || 0,
      quantity: form.quantity,
      total: selectedProduct ? selectedProduct.price * form.quantity : 0,
      comment: form.comment,
    };

    await orderMutation.mutateAsync(payload);

    if (onSuccessCallback) {
      onSuccessCallback();
    }
  };

  return {
    orderMutation,
    submitOrder,
  };
};

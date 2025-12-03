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
    orderId?: number | null
  ) => Promise<void>;
  resetMutation: () => void;
}

export const useOrderMutation = (
  onSuccess?: () => void
): UseOrderMutationReturn => {
  const orderMutation = useMutation<OrderResponse, Error, OrderData>({
    mutationFn: async (payload: OrderData & { id?: number }) => {
      const { id, ...orderData } = payload;

      if (id) {
        return ordersRepository.update(id, orderData);
      }

      return ordersRepository.submit(orderData);
    },
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
    orderId?: number | null
  ): Promise<void> => {
    const selectedProduct = productsData?.find(
      (product) => product.id === form.productId
    );

    const selectedCategory = categoriesData?.find(
      (category) => category.id === form.categoryId
    );

    const payload: OrderData & { id?: number } = {
      id: orderId ?? undefined,
      category: selectedCategory?.name || "",
      product: selectedProduct?.name || "",
      price: selectedProduct?.price || 0,
      quantity: form.quantity,
      total: selectedProduct ? selectedProduct.price * form.quantity : 0,
      comment: form.comment,
    };

    await orderMutation.mutateAsync(payload);
  };

  const resetMutation = (): void => {
    orderMutation.reset();
  };

  return {
    orderMutation,
    submitOrder,
    resetMutation,
  };
};

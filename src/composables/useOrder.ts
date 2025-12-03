import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import type { OrderResponse } from "@/types/models/order.model";
import { ordersRepository } from "@/repositories/index";

interface UseOrderReturn {
  orderData: ReturnType<typeof useQuery<OrderResponse, Error>>["data"];
  orderLoading: ReturnType<typeof useQuery<OrderResponse, Error>>["isLoading"];
  orderHasError: ReturnType<typeof useQuery<OrderResponse, Error>>["isError"];
  orderError: ReturnType<typeof useQuery<OrderResponse, Error>>["error"];
  refetchOrder: ReturnType<typeof useQuery<OrderResponse, Error>>["refetch"];
}
export const useOrder = (
  orderId: number | null | undefined
): UseOrderReturn => {
  const orderQuery = useQuery<OrderResponse, Error>({
    queryKey: computed(() => ["order", orderId]),
    queryFn: async () => {
      if (!orderId) {
        throw new Error("Order Id is required");
      }

      return ordersRepository.get(orderId);
    },
    enabled: computed(() => !!orderId),
    staleTime: 5 * 60 * 1000,
  });

  return {
    orderData: orderQuery.data,
    orderLoading: orderQuery.isLoading,
    orderHasError: orderQuery.isError,
    orderError: orderQuery.error,
    refetchOrder: orderQuery.refetch,
  };
};

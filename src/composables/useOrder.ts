import { computed, Ref, ComputedRef } from "vue";
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
  orderId:
    | Ref<number | null | undefined>
    | ComputedRef<number | null | undefined>
    | number
    | undefined
): UseOrderReturn => {
  const orderIdRef =
    typeof orderId === "object" && "value" in orderId
      ? computed(() => orderId.value)
      : computed(() => orderId);

  const orderQuery = useQuery<OrderResponse, Error>({
    queryKey: computed(() => ["order", orderIdRef.value]),
    queryFn: async () => {
      const id = orderIdRef.value;
      if (!id) {
        throw new Error("Order Id is required");
      }

      return ordersRepository.get(id);
    },
    enabled: computed(() => !!orderIdRef.value),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });

  return {
    orderData: orderQuery.data,
    orderLoading: orderQuery.isLoading,
    orderHasError: orderQuery.isError,
    orderError: orderQuery.error,
    refetchOrder: orderQuery.refetch,
  };
};

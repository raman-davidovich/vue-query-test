import { useQuery } from "@tanstack/vue-query";
import type { OrderResponse } from "@/types/models/order.model";
import { ordersRepository } from "@/repositories/index";

interface UseOrdersReturn {
  ordersData: ReturnType<typeof useQuery<OrderResponse[], Error>>["data"];
  ordersLoading: ReturnType<
    typeof useQuery<OrderResponse[], Error>
  >["isLoading"];
  ordersHasError: ReturnType<
    typeof useQuery<OrderResponse[], Error>
  >["isError"];
  ordersError: ReturnType<typeof useQuery<OrderResponse[], Error>>["error"];
  refetchOrders: ReturnType<typeof useQuery<OrderResponse[], Error>>["refetch"];
}

export const useOrders = (): UseOrdersReturn => {
  const ordersQuery = useQuery<OrderResponse[], Error>({
    queryKey: ["orders"],
    queryFn: async () => ordersRepository.getAll(),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return {
    ordersData: ordersQuery.data,
    ordersLoading: ordersQuery.isLoading,
    ordersHasError: ordersQuery.isError,
    ordersError: ordersQuery.error,
    refetchOrders: ordersQuery.refetch,
  };
};

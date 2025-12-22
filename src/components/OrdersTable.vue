<script setup lang="ts">
import { onMounted } from "vue";
import { useOrders } from "../composables/useOrders";
import type { OrderResponse } from "@/types/models/order.model";
import LoadingSpinner from "./OrderForm/LoadingSpinner.vue";
import ErrorBanner from "./OrderForm/ErrorBanner.vue";

interface OrdersTableEmits {
  selectOrder: [orderId: number];
}

const emit = defineEmits<OrdersTableEmits>();

const {
  ordersData,
  ordersLoading,
  ordersHasError,
  ordersError,
  refetchOrders,
} = useOrders();

const columns = [
  {
    name: "id",
    required: true,
    label: "ID",
    align: "left" as const,
    field: (row: OrderResponse) => row.id,
    format: (value: number): string => `${value}`,
    sortable: true,
  },
  {
    name: "category",
    align: "left" as const,
    label: "Category",
    field: (row: OrderResponse) => row.category,
    sortable: true,
  },
  {
    name: "product",
    align: "left" as const,
    label: "Product",
    field: (row: OrderResponse) => row.product,
    sortable: true,
  },
  {
    name: "price",
    align: "right" as const,
    label: "Price",
    field: (row: OrderResponse) => row.price,
    format: (value: number): string => `${value} rub.`,
    sortable: true,
  },
  {
    name: "quantity",
    align: "center" as const,
    label: "Quantity",
    field: (row: OrderResponse) => row.quantity,
    sortable: true,
  },
  {
    name: "total",
    align: "right" as const,
    label: "Total",
    field: (row: OrderResponse) => row.total,
    format: (value: number): string => `${value} rub.`,
    sortable: true,
  },
  {
    name: "createdAt",
    align: "left" as const,
    label: "Created At",
    field: (row: OrderResponse) => row.createdAt,
    format: (value: string): string => new Date(value).toLocaleString(),
    sortable: true,
  },
  {
    name: "actions",
    align: "center" as const,
    label: "Actions",
    field: () => "",
  },
];

const handleRowClick = (row: OrderResponse) => {
  emit("selectOrder", row.id);
};

const handleRetry = () => {
  refetchOrders();
};

onMounted(() => {
  refetchOrders();
});

defineExpose({
  refetchOrders,
});
</script>

<template>
  <q-card class="q-pa-md">
    <q-card-section>
      <div class="text-h5 q-mb-md">
        <slot name="title"></slot>
      </div>

      <LoadingSpinner :showing="ordersLoading" />

      <ErrorBanner
        :has-error="ordersHasError"
        :mutationError="ordersError"
        :show-retry-button="true"
        @retry="handleRetry"
      />

      <q-table
        v-if="ordersData && ordersData.length > 0"
        :rows="ordersData"
        :columns="columns"
        row-key="id"
        :loading="ordersLoading"
        @row-click="handleRowClick"
        class="cursor-pointer"
        flat
        :rows-per-page-options="[5, 10, 20]"
        :pagination="{ rowPerPage: 5, sortBy: 'createdAt', descending: true }"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props>
            <q-btn
              flat
              dense
              round
              icon="edit"
              color="primary"
              @click.stop="emit('selectOrder', props.row.id)"
            />
          </q-td>
        </template>
      </q-table>

      <q-banner
        v-else-if="!ordersLoading && ordersData && ordersData.length === 0"
        class="bg-info text-white q-mt-md"
      >
        No orders found.Create your first order!
      </q-banner>
    </q-card-section>
  </q-card>
</template>

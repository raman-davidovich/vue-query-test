<script setup lang="ts">
import OrderForm from "./OrderForm.vue";

interface Props {
  orderId: number;
}

const props = defineProps<Props>();

const handleSuccess = () => {
  console.log("Order updated successfully");
  // TODO: Show success banner
};
</script>

<template>
  <OrderForm
    mode="edit"
    :order-id="props.orderId"
    title="Edit order"
    :show-cache-info="true"
    :on-success="handleSuccess"
  />
</template>

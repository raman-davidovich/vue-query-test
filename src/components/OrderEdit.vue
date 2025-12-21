<script setup lang="ts">
import OrderForm from "./OrderForm.vue";

interface Props {
  orderId: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  success: [];
}>();

const handleSuccess = () => {
  console.log("Order updated successfully");
  emit("success");
  // TODO: Show success banner
};
</script>

<template>
  <OrderForm
    :key="`order-edit-${props.orderId}`"
    mode="edit"
    :order-id="props.orderId"
    title="Edit order"
    :show-cache-info="true"
    :on-success="handleSuccess"
  />
</template>

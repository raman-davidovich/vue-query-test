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
    :show-cache-info="true"
    :on-success="handleSuccess"
  >
    <template #title>
      <div class="row items-center q-gutter-sm">
        <span>Edit order #{{ props.orderId }}</span>
      </div>
    </template>
  </OrderForm>
</template>

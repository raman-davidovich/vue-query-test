<script setup lang="ts">
import OrderForm from "./OrderForm.vue";

const emit = defineEmits<{
  success: [];
}>();

const handleSuccess = () => {
  console.log("Order created successfully");
  emit("success");
  // TODO: think about SuccessBanner showing
};
</script>

<template>
  <OrderForm
    mode="create"
    title="Create new order"
    :show-cache-info="true"
    @success="handleSuccess"
  />
</template>

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
  <OrderForm mode="create" :show-cache-info="true" @success="handleSuccess">
    <template #title> Create new order </template>
  </OrderForm>
</template>

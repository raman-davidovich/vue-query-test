<script setup lang="ts">
import OrderForm from "./OrderForm.vue";

const handleSuccess = () => {
  console.log("Order created successfully");
  // think about SuccessBanner showing
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

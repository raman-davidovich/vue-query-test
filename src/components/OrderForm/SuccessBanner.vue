<script setup lang="js">
defineProps({
  isSuccess: {
    type: Boolean,
    required: true
  },
  orderId: {
    type: [String, Number],
    default: null
  },
  message: {
    type: String,
    default: "Операция выполнена успешно!"
  }
});
</script>

<template>
  <q-banner v-if="isSuccess" class="bg-positive text-white">
    <template v-if="orderId">
      Заказ успешно отправлен! ID: {{ orderId }}
    </template>
    <template v-else>
      {{ message }}
    </template>
  </q-banner>
</template>

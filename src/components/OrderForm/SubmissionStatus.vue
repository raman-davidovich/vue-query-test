<template>
  <div v-if="isPending" class="text-info">
    <q-spinner size="sm" class="q-mr-sm" />
    Отправка заказа...
  </div>
</template>

<script setup>
defineProps({
  isPending: {
    type: Boolean,
    required: true,
  },
});
</script>

<script setup lang="js">
defineProps({
  hasError: {
    type: Boolean,
    required: true
  },
  productsError: {
    type: Object,
    default: null
  },
  categoriesError: {
    type: Object,
    default: null
  },
  mutationError: {
    type: Object,
    default: null
  },
  showRetryButton: {
    type: Boolean,
    default: false
  }
});

defineEmits(['retry']);
</script>

<template>
  <q-banner v-if="hasError" class="bg-negative text-white q-mb-md">
    <template v-if="productsError">
      Ошибка загрузки товаров: {{ productsError.message }}
    </template>

    <template v-else-if="categoriesError">
      Ошибка загрузки категорий: {{ categoriesError.message }}
    </template>

    <template v-else-if="mutationError">
      Ошибка отправки: {{ mutationError.message }}
    </template>

    <q-btn
      v-if="showRetryButton"
      flat
      color="white"
      label="Повторить"
      @click="$emit('retry')"
    />
  </q-banner>
</template>

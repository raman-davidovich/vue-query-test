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

const emit = defineEmits(['retry']);
</script>

<template>
  <q-banner v-if="hasError" class="bg-negative text-white q-mb-md">
    <template v-if="productsError">
      Loading products error: {{ productsError.message }}
    </template>

    <template v-else-if="categoriesError">
      Loading categories error: {{ categoriesError.message }}
    </template>

    <template v-else-if="mutationError">
      Sending error: {{ mutationError.message }}
    </template>

    <q-btn
      v-if="showRetryButton"
      flat
      color="white"
      label="Retry"
      @click="emit('retry')"
    />
  </q-banner>
</template>

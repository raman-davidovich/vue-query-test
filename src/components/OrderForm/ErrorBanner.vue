<script setup lang="ts">
interface ErrorObject {
  message: string;
  code?: string | number;
  stack?: string;
}

interface ErrorBannerProps {
  hasError: boolean;
  productsError?: ErrorObject | null;
  categoriesError?: ErrorObject | null;
  mutationError?: ErrorObject | null;
  showRetryButton?: boolean;
}

interface ErrorBannerEmits {
  retry: [];
}

const props = withDefaults(defineProps<ErrorBannerProps>(), {
  productsError: null,
  categoriesError: null,
  mutationError: null,
  showRetryButton: false,
});

const emit = defineEmits<ErrorBannerEmits>();
</script>

<template>
  <q-banner v-if="props.hasError" class="bg-negative text-white q-mb-md">
    <template v-if="props.productsError">
      Loading products error: {{ props.productsError.message }}
    </template>

    <template v-else-if="props.categoriesError">
      Loading categories error: {{ props.categoriesError.message }}
    </template>

    <template v-else-if="props.mutationError">
      Sending error: {{ props.mutationError.message }}
    </template>

    <q-btn
      v-if="props.showRetryButton"
      flat
      color="white"
      label="Retry"
      @click="emit('retry')"
    />
  </q-banner>
</template>

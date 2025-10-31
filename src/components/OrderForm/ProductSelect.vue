<script setup lang="ts">
import { computed, type ComputedRef } from "vue";

interface SelectOption {
  label: string;
  value: number;
}

interface ProductSelectProps {
  options: SelectOption[];
  loading?: boolean;
  hasError?: boolean;
  categoryId?: number | null;
}

type ProductModel = number | null;

const model = defineModel<ProductModel>({
  default: null,
});

const props = withDefaults(defineProps<ProductSelectProps>(), {
  loading: false,
  hasError: false,
  categoryId: null,
});

const validationRules = [
  (value: ProductModel): boolean | string => {
    return !!value || "Choose product";
  },
];

const isDisabled: ComputedRef<boolean> = computed(() => {
  return props.loading || props.hasError || !props.categoryId;
});
</script>

<template>
  <q-select
    v-model="model"
    :options="props.options"
    label="Product *"
    :loading="props.loading"
    :disable="isDisabled"
    emit-value
    map-options
    :rules="validationRules"
    filled
    name="product"
  />
</template>

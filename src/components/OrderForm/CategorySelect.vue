<script setup lang="ts">
interface SelectOption {
  label: string;
  value: number;
}

interface CategorySelectProps {
  options: SelectOption[];
  loading?: boolean;
  hasError?: boolean;
}

type CategoryModel = number | null;

const model = defineModel<CategoryModel>({
  default: null,
});

const props = withDefaults(defineProps<CategorySelectProps>(), {
  loading: false,
  hasError: false,
});

const validationRules = [
  (value: CategoryModel): boolean | string => {
    return !!value || "Choose category";
  },
];
</script>

<template>
  <q-select
    id="category-select"
    v-model="model"
    :options="props.options"
    label="Category *"
    :loading="props.loading"
    :disable="props.loading || props.hasError"
    emit-value
    map-options
    :rules="validationRules"
    filled
    name="category-select"
  />
</template>

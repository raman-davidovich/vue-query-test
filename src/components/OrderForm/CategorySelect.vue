<script setup lang="js">
defineProps({
  modelValue: {
    type: [String, Number],
    default: null,
  },
  options: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  hasError: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <q-select
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :options="options"
    label="Категория *"
    :loading="loading"
    :disable="loading || hasError"
    emit-value
    map-options
    :rules="[(value) => !!value || 'Выберите категорию']"
  />
</template>

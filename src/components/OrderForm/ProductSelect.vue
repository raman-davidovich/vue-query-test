<template>
  <q-select
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :options="options"
    label="Товар *"
    :loading="loading"
    :disable="loading || hasError || !categoryId"
    emit-value
    map-options
    :rules="[(value) => !!value || 'Выберите товар']"
  />
</template>

<script setup>
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
  categoryId: {
    type: [String, Number],
    default: null,
  },
});

defineEmits(["update:modelValue"]);
</script>

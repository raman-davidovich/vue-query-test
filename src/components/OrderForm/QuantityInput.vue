<script setup lang="js">
defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <q-input
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    type="number"
    label="Количество *"
    min="1"
    max="10"
    :rules="[
      (value) => !!value || 'Введите количество',
      (value) => (value >= 1 && value <= 10) || 'Количество от 1 до 10',
    ]"
  />
</template>

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
    label="Quantity *"
    min="1"
    max="10"
    :rules="[
      (value) => !!value || 'Enter quantity',
      (value) => (value >= 1 && value <= 10) || 'Amount from 1 to 10',
    ]"
    name="quantity"
    filled
  />
</template>

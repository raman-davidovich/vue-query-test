<template>
  <q-input
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    label="Комментарий"
    type="textarea"
    autogrow
  />
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

defineEmits(["update:modelValue"]);
</script>

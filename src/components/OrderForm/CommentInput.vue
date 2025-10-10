<script setup lang="js">
defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

defineEmits(["update:modelValue"]);
</script>

<template>
  <q-input
    :modelValue
    @update:model-value="$emit('update:modelValue', $event)"
    label="Comment"
    type="textarea"
    autogrow
    filled
    name="comment"
  />
</template>

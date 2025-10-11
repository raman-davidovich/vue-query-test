<script setup lang="js">

const model = defineModel({
  type: [String, Number],
  default: null,
})

defineProps({
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
</script>

<template>
  <q-select
    id="category-select"
    v-model="model"
    :options
    label="Category *"
    :loading
    :disable="loading || hasError"
    emit-value
    map-options
    :rules="[(value) => !!value || 'Choose category']"
    filled
    name="category-select"
  />
</template>

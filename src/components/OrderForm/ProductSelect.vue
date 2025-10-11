<script setup lang="js">

const model =  defineModel({
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
  categoryId: {
    type: [String, Number],
    default: null,
  },
});
</script>

<template>
  <q-select
    v-model="model"
    :options
    label="Product *"
    :loading
    :disable="loading || hasError || !categoryId"
    emit-value
    map-options
    :rules="[(value) => !!value || 'Choose product']"
    filled
    name="product"
  />
</template>

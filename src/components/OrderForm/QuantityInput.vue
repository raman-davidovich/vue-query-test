<script setup lang="js">
const model = defineModel({
  type: [String, Number],
  required: true,
})
</script>

<template>
  <q-input
    v-model="model"
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

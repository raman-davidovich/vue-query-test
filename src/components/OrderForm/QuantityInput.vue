<script setup lang="ts">
const model = defineModel<number>({ required: true });

const MIN_QUANTITY = 1;
const MAX_QUANTITY = 10;

const validationRules = [
  (value: number): boolean | string => !!value || "Enter quantity",
  (value: number): boolean | string =>
    (value >= MIN_QUANTITY && value <= MAX_QUANTITY) ||
    `Amount from ${MIN_QUANTITY} to ${MAX_QUANTITY}`,
] as const;
</script>

<template>
  <q-input
    v-model.number="model"
    type="number"
    label="Quantity *"
    min="MIN_QUANTITY"
    max="MAX_QUANTITY"
    :rules="validationRules"
    name="quantity"
    filled
  />
</template>

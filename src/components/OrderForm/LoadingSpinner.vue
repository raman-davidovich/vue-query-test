<template>
  <q-inner-loading
    :showing="showing"
    :label="label"
  />
</template>

<script setup>
defineProps({
  showing: {
    type: Boolean,
    required: true
  },
  label: {
    type: String,
    default: "Загрузка данных..."
  }
});
</script>
